/**
 * Deploy Script for Wedding Invitation (Direct Server Sync via SFTP/SSH)
 * Hoàn toàn KHÔNG đẩy code lên Git!
 * Triggered by: npm run build or npm run deploy
 */

const fs = require('fs');
const path = require('path');
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

// Các thư mục và tệp tin loại trừ (không upload lên server)
const EXCLUDED_DIRS = new Set([
  'node_modules',
  '.git',
  'tests',
  'test-results',
  '.gemini',
  '.vscode',
  '.idea'
]);

const EXCLUDED_FILES = new Set([
  'deploy.js',
  'deploy.cjs',
  '.gitignore',
  'package-lock.json',
  'mobile-ui-single-file.html',
  'Thumbs.db',
  '.DS_Store'
]);

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

// Quét toàn bộ tệp tin cần upload
function scanProjectFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of list) {
    const fullPath = path.join(dir, item.name);
    const relPath = path.relative(baseDir, fullPath).replace(/\\/g, '/');

    if (item.isDirectory()) {
      if (EXCLUDED_DIRS.has(item.name)) continue;
      results = results.concat(scanProjectFiles(fullPath, baseDir));
    } else {
      if (EXCLUDED_FILES.has(item.name) || item.name.endsWith('.log')) continue;
      const stats = fs.statSync(fullPath);
      results.push({
        localPath: fullPath,
        relPath: relPath,
        size: stats.size,
        mtime: stats.mtimeMs
      });
    }
  }
  return results;
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
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

function getRemoteStat(sftp, remoteFilePath) {
  return new Promise((resolve) => {
    sftp.stat(remoteFilePath, (err, stats) => {
      if (err) return resolve(null);
      resolve(stats);
    });
  });
}

function uploadFile(sftp, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(localPath, remotePath, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function main() {
  const startTime = Date.now();

  console.log('\n' + '='.repeat(65));
  console.log(`${colors.bold}${colors.magenta}   👰💒 TUẤN ANH & HOÀNG THÚY - BUILD & DEPLOY TRỰC TIẾP 💒🤵${colors.reset}`);
  console.log(`${colors.dim}   (Cơ chế: Upload thẳng lên Server qua SFTP - Hoàn toàn không qua Git)${colors.reset}`);
  console.log('='.repeat(65) + '\n');

  // BƯỚC 1: Quét tệp tin local
  log('📂', 'Bước 1: Quét tệp tin mã nguồn local...');
  const localFiles = scanProjectFiles(process.cwd());
  success(`Đã quét thấy ${localFiles.length} tệp tin dự án (đã bỏ qua node_modules, .git, tệp tạm).`);

  // BƯỚC 2: Kết nối SSH & SFTP tới Server
  console.log('');
  log('🔐', `Bước 2: Kết nối SSH & SFTP tới Server ${CONFIG.host}:${CONFIG.port}...`);
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
    const sftp = await new Promise((resolve, reject) => {
      conn.sftp((err, sftpClient) => {
        if (err) return reject(err);
        success('Mở kênh truyền tải tệp tin SFTP thành công.');
        resolve(sftpClient);
      });
    });

    // BƯỚC 3: Tạo thư mục cần thiết trên Server
    console.log('');
    log('📁', 'Bước 3: Đảm bảo các thư mục đích tồn tại trên server...');
    const remoteDirs = new Set(
      localFiles.map(f => path.posix.dirname(path.posix.join(CONFIG.remotePath, f.relPath)))
    );
    remoteDirs.add(CONFIG.remotePath);
    const mkdirCmd = `mkdir -p ${Array.from(remoteDirs).map(d => `"${d}"`).join(' ')}`;
    await runRemote(conn, mkdirCmd);
    success(`Đã kiểm tra cấu trúc thư mục trên server (${CONFIG.remotePath}).`);

    // BƯỚC 4: Đồng bộ tệp tin (Smart Sync qua SFTP)
    console.log('');
    log('📤', 'Bước 4: Đồng bộ tệp tin lên server (chỉ tải tệp có thay đổi)...');
    let uploadedCount = 0;
    let skippedCount = 0;

    for (const file of localFiles) {
      const remoteFilePath = path.posix.join(CONFIG.remotePath, file.relPath);
      const remoteStat = await getRemoteStat(sftp, remoteFilePath);

      // Nếu là js/config.js và trên server đã có cấu hình thực tế của người dùng, không ghi đè
      if (file.relPath === 'js/config.js' && remoteStat) {
        skippedCount++;
        console.log(`   ${colors.yellow}↷ [Preserved]${colors.reset} ${file.relPath} (Bảo toàn dữ liệu thật trên server)`);
        continue;
      }

      // So sánh kích thước và thời gian sửa đổi (nếu remote có cùng kích thước và mtime >= local thì bỏ qua)
      const isUpToDate = remoteStat &&
        remoteStat.size === file.size &&
        remoteStat.mtime >= Math.floor(file.mtime / 1000);

      if (isUpToDate) {
        skippedCount++;
      } else {
        await uploadFile(sftp, file.localPath, remoteFilePath);
        uploadedCount++;
        console.log(`   ${colors.green}↑ [Uploaded]${colors.reset} ${file.relPath} (${formatSize(file.size)})`);
      }
    }

    if (uploadedCount === 0) {
      success(`Tất cả ${skippedCount} tệp tin trên server đã đồng bộ mới nhất (không có tệp thay đổi).`);
    } else {
      success(`Đã tải lên thành công ${uploadedCount} tệp tin mới/chỉnh sửa (${skippedCount} tệp không đổi đã bỏ qua).`);
    }

    // BƯỚC 5: Đảm bảo Docker Container & API Server hoạt động
    console.log('');
    log('🐳', `Bước 5: Kiểm tra Docker Container (${CONFIG.containerName}) & Cập nhật Server API...`);

    // Tải lên và khởi động lại API Python nếu có cập nhật
    const localApiPy = path.join(__dirname, 'tools', 'server_api.py');
    if (fs.existsSync(localApiPy)) {
      await uploadFile(sftp, localApiPy, path.posix.join(CONFIG.remotePath, 'server_api.py'));
      await runRemote(conn, 'systemctl restart thiepcuoi-api || true');
      success('Dịch vụ lưu cấu hình và ảnh thiepcuoi-api đã cập nhật & khởi động lại.');
    }

    const psRes = await runRemote(conn, `docker ps --filter name=${CONFIG.containerName} --format "{{.Status}}"`);
    
    if (psRes.stdout.includes('Up')) {
      // Restart container so new nginx.conf location directives take full effect
      await runRemote(conn, `docker restart ${CONFIG.containerName} || true`);
      success(`Docker container [${CONFIG.containerName}] đã khởi động lại và nạp cấu hình Nginx.`);
    } else {
      log('🔄', `Khởi chạy lại container [${CONFIG.containerName}] trên cổng ${CONFIG.webPort}...`);
      await runRemote(conn, `docker rm -f ${CONFIG.containerName} || true`);
      const runDockerCmd = `docker run -d --name ${CONFIG.containerName} -p ${CONFIG.webPort}:80 -v ${CONFIG.remotePath}:/usr/share/nginx/html:ro -v ${CONFIG.remotePath}/nginx.conf:/etc/nginx/conf.d/default.conf:ro --restart unless-stopped nginx:alpine`;
      const runRes = await runRemote(conn, runDockerCmd);
      if (runRes.code === 0) {
        success(`Khởi tạo container [${CONFIG.containerName}] thành công! ID: ${runRes.stdout.substring(0, 12)}`);
      } else {
        error(`Lỗi chạy container: ${runRes.stderr}`);
      }
    }

    // Đồng bộ sang thư mục phụ /opt/uavdemo/thuybeo (để người dùng truy cập thư mục nào cũng thấy ảnh & code mới)
    await runRemote(conn, 'if [ -d /opt/uavdemo/thuybeo ]; then cp -ru /var/www/thiepcuoi/* /opt/uavdemo/thuybeo/ 2>/dev/null || true; fi');

    // BƯỚC 6: Health Check
    console.log('');
    log('🔍', 'Bước 6: Kiểm tra trạng thái phản hồi HTTP...');
    const checkRes = await runRemote(conn, `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:${CONFIG.webPort}/`);
    if (checkRes.stdout === '200') {
      success(`Máy chủ phản hồi hoàn hảo: HTTP 200 OK!`);
    } else {
      warn(`Mã HTTP phản hồi: ${checkRes.stdout}`);
    }

    // TỔNG KẾT
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log('\n' + '='.repeat(65));
    console.log(`${colors.bold}${colors.green}   🎉 BUILD & DEPLOY HOÀN TẤT THÀNH CÔNG (${duration}s)! 🎉${colors.reset}`);
    console.log('='.repeat(65));
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
