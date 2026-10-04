/**
 * Deploy Script for Wedding Invitation
 * Triggered by: npm run build or npm run deploy
 */

const { execSync } = require('child_process');
const { Client } = require('ssh2');

// Cấu hình máy chủ triển khai
const CONFIG = {
  host: process.env.DEPLOY_HOST || '180.93.54.36',
  port: parseInt(process.env.DEPLOY_PORT || '22', 10),
  username: process.env.DEPLOY_USER || 'root',
  password: process.env.DEPLOY_PASSWORD || '@Sieutoc!T7DpHg3vOb@F',
  remotePath: process.env.DEPLOY_PATH || '/var/www/thiepcuoi',
  containerName: 'thiepcuoi-web',
  webPort: 8080
};

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

function log(emoji, title, desc = '') {
  console.log(`${colors.bold}${colors.cyan}${emoji}  ${title}${colors.reset}${desc ? `\n   ${colors.dim}${desc}${colors.reset}` : ''}`);
}

function success(msg) {
  console.log(`${colors.green}✔ ${msg}${colors.reset}`);
}

function warn(msg) {
  console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`);
}

function error(msg) {
  console.error(`${colors.red}✖ ${msg}${colors.reset}`);
}

function runLocal(cmd) {
  try {
    return execSync(cmd, { stdio: 'pipe', encoding: 'utf-8' }).trim();
  } catch (err) {
    if (err.stdout) return err.stdout.trim();
    throw err;
  }
}

async function runRemote(conn, command) {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';
      stream.on('data', (data) => {
        stdout += data.toString();
      });
      stream.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      stream.on('close', (code) => {
        resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() });
      });
    });
  });
}

async function main() {
  const startTime = Date.now();

  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bold}${colors.magenta}   👰💒 TUẤN ANH & HOÀNG THÚY - AUTO BUILD & DEPLOY 💒🤵${colors.reset}`);
  console.log('='.repeat(60) + '\n');

  // BƯỚC 1: Xử lý Git local
  log('📦', 'Bước 1: Đồng bộ mã nguồn Git local...');
  try {
    const status = runLocal('git status --porcelain');
    if (status) {
      log('📝', 'Phát hiện thay đổi trong mã nguồn, đang tự động commit...');
      runLocal('git add .');
      const now = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
      const commitMsg = `Auto deploy build: ${now}`;
      runLocal(`git commit -m "${commitMsg}"`);
      success(`Đã tạo commit: "${commitMsg}"`);
    } else {
      success('Mã nguồn local sạch (không có thay đổi mới).');
    }

    log('🚀', 'Đang đẩy mã nguồn lên GitHub (origin/main)...');
    runLocal('git push origin main');
    const commitHash = runLocal('git rev-parse --short HEAD');
    success(`Đã đẩy lên GitHub thành công! Commit: [${commitHash}]`);
  } catch (err) {
    warn(`Lưu ý Git: ${err.message}`);
    log('ℹ️', 'Tiếp tục tiến trình deploy lên server...');
  }

  // BƯỚC 2: Kết nối SSH tới Server
  console.log('');
  log('🔐', `Bước 2: Kết nối SSH tới Server ${CONFIG.host}:${CONFIG.port}...`);
  const conn = new Client();

  await new Promise((resolve, reject) => {
    conn.on('ready', () => {
      success(`Kết nối SSH thành công tới ${CONFIG.username}@${CONFIG.host}`);
      resolve();
    });
    conn.on('error', (err) => {
      error(`Lỗi kết nối SSH: ${err.message}`);
      reject(err);
    });
    conn.connect({
      host: CONFIG.host,
      port: CONFIG.port,
      username: CONFIG.username,
      password: CONFIG.password,
      readyTimeout: 15000
    });
  });

  try {
    // BƯỚC 3: Đồng bộ Git trên Server
    console.log('');
    log('📥', `Bước 3: Đồng bộ mã nguồn tại ${CONFIG.remotePath}...`);
    const updateCmd = `cd ${CONFIG.remotePath} && git fetch origin && git reset --hard origin/main`;
    const gitRes = await runRemote(conn, updateCmd);
    if (gitRes.code === 0) {
      success(`Cập nhật server thành công: ${gitRes.stdout}`);
    } else {
      warn(`Cảnh báo cập nhật git trên server: ${gitRes.stderr || gitRes.stdout}`);
    }

    // BƯỚC 4: Kiểm tra và đảm bảo Docker Container hoạt động
    console.log('');
    log('🐳', `Bước 4: Kiểm tra Docker Container (${CONFIG.containerName})...`);
    const psRes = await runRemote(conn, `docker ps --filter name=${CONFIG.containerName} --format "{{.Status}}"`);
    
    if (psRes.stdout.includes('Up')) {
      success(`Docker container [${CONFIG.containerName}] đang hoạt động bình thường.`);
    } else {
      log('🔄', `Khởi chạy lại container [${CONFIG.containerName}] trên cổng ${CONFIG.webPort}...`);
      await runRemote(conn, `docker rm -f ${CONFIG.containerName} || true`);
      const runDockerCmd = `docker run -d --name ${CONFIG.containerName} -p ${CONFIG.webPort}:80 -v ${CONFIG.remotePath}:/usr/share/nginx/html:ro --restart unless-stopped nginx:alpine`;
      const runRes = await runRemote(conn, runDockerCmd);
      if (runRes.code === 0) {
        success(`Khởi tạo container [${CONFIG.containerName}] thành công! ID: ${runRes.stdout.substring(0, 12)}`);
      } else {
        error(`Lỗi chạy container: ${runRes.stderr}`);
      }
    }

    // BƯỚC 5: Health Check
    console.log('');
    log('🔍', 'Bước 5: Kiểm tra trạng thái phản hồi HTTP...');
    const checkRes = await runRemote(conn, `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:${CONFIG.webPort}/`);
    if (checkRes.stdout === '200') {
      success(`Máy chủ phản hồi hoàn hảo: HTTP 200 OK!`);
    } else {
      warn(`Mã HTTP phản hồi: ${checkRes.stdout}`);
    }

    // TỔNG KẾT
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n' + '='.repeat(60));
    console.log(`${colors.bold}${colors.green}   🎉 BUILD & DEPLOY HOÀN TẤT THÀNH CÔNG (${duration}s)! 🎉${colors.reset}`);
    console.log('='.repeat(60));
    console.log(`\n${colors.bold}🌐 ĐỊA CHỈ TRUY CẬP TRỰC TIẾP:${colors.reset}`);
    console.log(`   💌 Website Thiệp Cưới:   ${colors.cyan}http://${CONFIG.host}:${CONFIG.webPort}/${colors.reset}`);
    console.log(`   ⚙️  Trang Quản Trị:      ${colors.cyan}http://${CONFIG.host}:${CONFIG.webPort}/admin.html${colors.reset}`);
    console.log(`   🔑 Mã PIN Quản Trị:      ${colors.yellow}2010${colors.reset}\n`);

  } finally {
    conn.end();
  }
}

main().catch((err) => {
  error(`\nQuá trình build/deploy thất bại: ${err.message}`);
  process.exit(1);
});
