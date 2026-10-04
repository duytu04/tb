const { Client } = require('ssh2');

const cmd = process.argv[2] || 'docker ps';

const conn = new Client();
conn.on('ready', () => {
  conn.exec(cmd, (err, stream) => {
    if (err) {
      console.error('Exec error:', err);
      conn.end();
      return;
    }
    let stdout = '';
    let stderr = '';
    stream.on('data', chunk => stdout += chunk);
    stream.stderr.on('data', chunk => stderr += chunk);
    stream.on('close', code => {
      console.log('EXIT CODE:', code);
      if (stdout) console.log('STDOUT:\n' + stdout);
      if (stderr) console.error('STDERR:\n' + stderr);
      conn.end();
    });
  });
}).connect({
  host: '180.93.54.36',
  port: 22,
  username: 'root',
  password: '@Sieutoc!T7DpHg3vOb@F'
});
