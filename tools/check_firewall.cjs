const { Client } = require('ssh2');

const conn = new Client();
conn.on('ready', () => {
  conn.exec('ufw status || iptables -L -n -v', (err, stream) => {
    if (err) throw err;
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('close', () => {
      console.log('Firewall status:\n', data.slice(0, 500));
      conn.end();
    });
  });
}).connect({
  host: '180.93.54.36',
  port: 22,
  username: 'root',
  password: '@Sieutoc!T7DpHg3vOb@F'
});
