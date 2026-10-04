const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('docker exec thiepcuoi-web ping -c 1 172.17.0.1 || docker exec thiepcuoi-web nc -z 172.17.0.1 22', (err, stream) => {
    if (err) throw err;
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('close', () => {
      console.log('Result:\n', data);
      conn.end();
    });
  });
}).connect({
  host: '180.93.54.36',
  port: 22,
  username: 'root',
  password: '@Sieutoc!T7DpHg3vOb@F'
});
