const { Client } = require('ssh2');

const serverApiPy = `#!/usr/bin/env python3
import json
import os
import re
import base64
import time
from http.server import HTTPServer, BaseHTTPRequestHandler

WEB_ROOT = '/var/www/thiepcuoi'
IMAGES_DIR = os.path.join(WEB_ROOT, 'assets', 'images')
CONFIG_PATH = os.path.join(WEB_ROOT, 'js', 'config.js')

class WeddingHandler(BaseHTTPRequestHandler):
    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/save-config':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
                config = data.get('config', data)

                os.makedirs(IMAGES_DIR, exist_ok=True)
                gallery = config.get('gallery', [])
                for idx, item in enumerate(gallery):
                    src = item.get('src', '')
                    if src.startswith('data:image/'):
                        match = re.match(r'^data:image/([a-zA-Z0-9+]+);base64,(.+)$', src)
                        if match:
                            ext = match.group(1).lower()
                            if ext == 'jpeg': ext = 'jpg'
                            b64data = match.group(2)
                            filename = f'upload_{int(time.time())}_{idx}.{ext}'
                            filepath = os.path.join(IMAGES_DIR, filename)
                            with open(filepath, 'wb') as f:
                                f.write(base64.b64decode(b64data))
                            item['src'] = f'assets/images/{filename}'

                if 'memoryFilm' in config and config['memoryFilm'].get('posterSrc', '').startswith('data:image/'):
                    poster_src = config['memoryFilm']['posterSrc']
                    match = re.match(r'^data:image/([a-zA-Z0-9+]+);base64,(.+)$', poster_src)
                    if match:
                        ext = match.group(1).lower()
                        if ext == 'jpeg': ext = 'jpg'
                        filename = f'poster_{int(time.time())}.{ext}'
                        filepath = os.path.join(IMAGES_DIR, filename)
                        with open(filepath, 'wb') as f:
                            f.write(base64.b64decode(match.group(2)))
                        config['memoryFilm']['posterSrc'] = f'assets/images/{filename}'

                file_content = f\"\"\"/**\\n * WEDDING CONFIGURATION STORE (Đồng bộ trực tiếp từ Admin)\\n * Cặp đôi: {config.get('groom', {}).get('name', 'Tuấn Anh')} & {config.get('bride', {}).get('name', 'Hoàng Thúy')}\\n * Cập nhật: {time.strftime('%Y-%m-%d %H:%M:%S')}\\n */\\n\\nconst DEFAULT_WEDDING_CONFIG = {json.dumps(config, ensure_ascii=False, indent=2)};\\n\\nfunction getActiveWeddingConfig() {{\\n  try {{\\n    const saved = localStorage.getItem('wedding_custom_config');\\n    if (saved) {{\\n      return deepMerge(DEFAULT_WEDDING_CONFIG, JSON.parse(saved));\\n    }}\\n  }} catch (e) {{}}\\n  return JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));\\n}}\\n\\nfunction deepMerge(target, source) {{\\n  const output = Object.assign({{}}, target);\\n  if (isObject(target) && isObject(source)) {{\\n    Object.keys(source).forEach(key => {{\\n      if (isObject(source[key])) {{\\n        if (!(key in target)) Object.assign(output, {{ [key]: source[key] }});\\n        else output[key] = deepMerge(target[key], source[key]);\\n      }} else {{\\n        output[key] = source[key];\\n      }}\\n    }});\\n  }}\\n  return output;\\n}}\\n\\nfunction isObject(item) {{\\n  return item && typeof item === 'object' && !Array.isArray(item);\\n}}\\n\\nfunction saveActiveWeddingConfig(cfg) {{\\n  try {{\\n    localStorage.setItem('wedding_custom_config', JSON.stringify(cfg));\\n    return true;\\n  }} catch (e) {{ return false; }}\\n}}\\n\\nfunction resetActiveWeddingConfig() {{\\n  localStorage.removeItem('wedding_custom_config');\\n}}\\n\\nfunction generateVietQRUrl(bankCode, accountNo, accountName, memo, template = 'compact2') {{\\n  if (!bankCode || !accountNo) return '';\\n  return \`https://img.vietqr.io/image/\${{bankCode}}-\${{accountNo}}-\${{template}}.png?accountName=\${{encodeURIComponent(accountName || '')}}&addInfo=\${{encodeURIComponent(memo || '')}}\`;\\n}}\\n\\nwindow.DEFAULT_WEDDING_CONFIG = DEFAULT_WEDDING_CONFIG;\\nwindow.getActiveWeddingConfig = getActiveWeddingConfig;\\nwindow.saveActiveWeddingConfig = saveActiveWeddingConfig;\\nwindow.resetActiveWeddingConfig = resetActiveWeddingConfig;\\nwindow.generateVietQRUrl = generateVietQRUrl;\\nwindow.WEDDING_CONFIG = getActiveWeddingConfig();\\n\"\"\"
                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    f.write(file_content)

                resp = json.dumps({'success': True, 'config': config}).encode('utf-8')
                self.send_response(200)
                self._send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(resp)))
                self.end_headers()
                self.wfile.write(resp)
            except Exception as e:
                resp = json.dumps({'success': False, 'error': str(e)}).encode('utf-8')
                self.send_response(500)
                self._send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(resp)))
                self.end_headers()
                self.wfile.write(resp)
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', 8081), WeddingHandler)
    server.serve_forever()
`;

const conn = new Client();
conn.on('ready', () => {
  console.log('SSH connection ready.');
  
  // Write server_api.py and create systemd service
  const scriptCmd = `
cat << 'EOF' > /var/www/thiepcuoi/server_api.py
${serverApiPy}
EOF
chmod +x /var/www/thiepcuoi/server_api.py

cat << 'EOF' > /etc/systemd/system/thiepcuoi-api.service
[Unit]
Description=Wedding Website Config API Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/thiepcuoi
ExecStart=/usr/bin/python3 /var/www/thiepcuoi/server_api.py
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable thiepcuoi-api
systemctl restart thiepcuoi-api
systemctl status thiepcuoi-api --no-pager
`;

  conn.exec(scriptCmd, (err, stream) => {
    if (err) throw err;
    let data = '';
    stream.on('data', chunk => data += chunk);
    stream.on('close', () => {
      console.log('Service status output:\n', data);
      conn.end();
    });
  });
}).connect({
  host: '180.93.54.36',
  port: 22,
  username: 'root',
  password: '@Sieutoc!T7DpHg3vOb@F'
});
