const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('docker exec thiepcuoi-web cat /etc/nginx/conf.d/default.conf', (err, stream) => {
    if (err) throw err;
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('close', () => {
      console.log('Nginx config:\n', data);
      conn.end();
    });
  });
}).connect({
  host: '180.93.54.36',
  port: 22,
  username: 'root',
  password: '@Sieutoc!T7DpHg3vOb@F'
});
