const fs = require('fs');
const path = require('path');
const { Client } = require('ssh2');

const CONFIG = {
  host: '180.93.54.36',
  port: 22,
  username: 'root',
  password: '@Sieutoc!T7DpHg3vOb@F',
  remotePath: '/var/www/thiepcuoi',
  containerName: 'thiepcuoi-web',
  webPort: 8080
};

function runRemote(conn, command) {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);
      let stdout = '';
      let stderr = '';
      stream.on('data', data => stdout += data.toString());
      stream.stderr.on('data', data => stderr += data.toString());
      stream.on('close', code => resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() }));
    });
  });
}

function uploadFile(sftp, localPath, remotePath) {
  return new Promise((resolve, reject) => {
    sftp.fastPut(localPath, remotePath, err => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function main() {
  console.log('--- DEPLOYING SERVER API & NGINX PROXY ---');
  const conn = new Client();

  await new Promise((resolve, reject) => {
    conn.on('ready', resolve);
    conn.on('error', reject);
    conn.connect({
      host: CONFIG.host,
      port: CONFIG.port,
      username: CONFIG.username,
      password: CONFIG.password
    });
  });
  console.log('Connected via SSH.');

  const sftp = await new Promise((resolve, reject) => {
    conn.sftp((err, sftpClient) => {
      if (err) return reject(err);
      resolve(sftpClient);
    });
  });
  console.log('SFTP ready.');

  // 1. Upload server_api.py
  const localApi = path.join(__dirname, 'server_api.py');
  const remoteApi = path.posix.join(CONFIG.remotePath, 'server_api.py');
  await uploadFile(sftp, localApi, remoteApi);
  console.log('Uploaded server_api.py.');

  // 2. Upload nginx.conf
  const localNginx = path.join(__dirname, '..', 'nginx.conf');
  const remoteNginx = path.posix.join(CONFIG.remotePath, 'nginx.conf');
  await uploadFile(sftp, localNginx, remoteNginx);
  console.log('Uploaded nginx.conf.');

  // 3. Restart systemd service
  const systemdRes = await runRemote(conn, `
    chmod +x ${remoteApi}
    systemctl restart thiepcuoi-api
    systemctl status thiepcuoi-api --no-pager
  `);
  console.log('Systemd status:\n', systemdRes.stdout);

  // 4. Restart container with custom nginx.conf mount
  console.log('Recreating docker container with nginx.conf mount...');
  await runRemote(conn, `docker rm -f ${CONFIG.containerName} || true`);
  const dockerCmd = `docker run -d --name ${CONFIG.containerName} -p ${CONFIG.webPort}:80 -v ${CONFIG.remotePath}:/usr/share/nginx/html:ro -v ${CONFIG.remotePath}/nginx.conf:/etc/nginx/conf.d/default.conf:ro --restart unless-stopped nginx:alpine`;
  const dockerRes = await runRemote(conn, dockerCmd);
  console.log('Docker start res:', dockerRes);

  // 5. Test health through Nginx reverse proxy
  console.log('Testing reverse proxy through port 8080...');
  const testApi = await runRemote(conn, `curl -s -i http://127.0.0.1:${CONFIG.webPort}/api/health`);
  console.log('API Health check output:\n', testApi.stdout);

  const testWeb = await runRemote(conn, `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:${CONFIG.webPort}/`);
  console.log('Web check HTTP code:', testWeb.stdout);

  conn.end();
}

main().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
