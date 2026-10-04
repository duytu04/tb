#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Wedding Invitation Server-Side Sync API (Multi-threaded)
Handles universal configuration saving, base64 image extraction to static files,
and instant synchronization across all devices and visitors.
"""

import json
import os
import re
import base64
import time
import sys
from socketserver import ThreadingMixIn
from http.server import HTTPServer, BaseHTTPRequestHandler

WEB_ROOT = '/var/www/thiepcuoi'
BACKUP_ROOT = '/opt/uavdemo/thuybeo'
IMAGES_DIR = os.path.join(WEB_ROOT, 'assets', 'images')
VIDEO_DIR = os.path.join(WEB_ROOT, 'assets', 'video')
CONFIG_PATH = os.path.join(WEB_ROOT, 'js', 'config.js')

def log(msg):
    print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}", flush=True)

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class WeddingHandler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def log_message(self, format, *args):
        log(f"{self.client_address[0]} - {format % args}")

    def _send_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
        self.send_header('Connection', 'close')

    def do_OPTIONS(self):
        self.send_response(200)
        self._send_cors_headers()
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_GET(self):
        self.close_connection = True
        if self.path == '/api/health':
            resp = json.dumps({'status': 'ok', 'time': int(time.time())}).encode('utf-8')
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(resp)))
            self.end_headers()
            self.wfile.write(resp)
        elif self.path == '/api/get-config':
            try:
                with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
                    content = f.read()
                start_marker = 'const DEFAULT_WEDDING_CONFIG = '
                end_marker = ';\n\nfunction'
                start_idx = content.find(start_marker)
                end_idx = content.find(end_marker, start_idx)
                if start_idx != -1 and end_idx != -1:
                    raw_json = content[start_idx + len(start_marker):end_idx].strip()
                    cfg = json.loads(raw_json)
                    resp = json.dumps({'success': True, 'config': cfg}, ensure_ascii=False).encode('utf-8')
                else:
                    resp = json.dumps({'success': False, 'error': 'Cannot parse config file'}).encode('utf-8')
            except Exception as e:
                resp = json.dumps({'success': False, 'error': str(e)}).encode('utf-8')
            self.send_response(200)
            self._send_cors_headers()
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(resp)))
            self.end_headers()
            self.wfile.write(resp)
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        self.close_connection = True
        if self.path == '/api/save-config':
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length <= 0:
                self.send_response(400)
                self.end_headers()
                return

            log(f"Receiving /api/save-config payload ({content_length} bytes)...")
            body = self.rfile.read(content_length)
            try:
                data = json.loads(body.decode('utf-8'))
                config = data.get('config', data)

                os.makedirs(IMAGES_DIR, exist_ok=True)
                timestamp = int(time.time())

                # 1. Process Gallery Images
                gallery = config.get('gallery', [])
                processed_images = 0
                for idx, item in enumerate(gallery):
                    src = item.get('src', '')
                    if src and src.startswith('data:image/'):
                        match = re.match(r'^data:image/([a-zA-Z0-9+]+);base64,(.+)$', src)
                        if match:
                            raw_ext = match.group(1).lower()
                            ext = 'jpg' if raw_ext in ('jpeg', 'jpg') else ('png' if raw_ext == 'png' else 'webp')
                            b64data = match.group(2)
                            filename = f'gallery_{timestamp}_{idx}.{ext}'
                            filepath = os.path.join(IMAGES_DIR, filename)
                            with open(filepath, 'wb') as f:
                                f.write(base64.b64decode(b64data))
                            item['src'] = f'assets/images/{filename}'
                            processed_images += 1

                # 2. Process Memory Film Poster
                if 'memoryFilm' in config and isinstance(config['memoryFilm'], dict):
                    poster_src = config['memoryFilm'].get('posterSrc', '')
                    if poster_src and poster_src.startswith('data:image/'):
                        match = re.match(r'^data:image/([a-zA-Z0-9+]+);base64,(.+)$', poster_src)
                        if match:
                            raw_ext = match.group(1).lower()
                            ext = 'jpg' if raw_ext in ('jpeg', 'jpg') else ('png' if raw_ext == 'png' else 'webp')
                            filename = f'poster_{timestamp}.{ext}'
                            filepath = os.path.join(IMAGES_DIR, filename)
                            with open(filepath, 'wb') as f:
                                f.write(base64.b64decode(match.group(2)))
                            config['memoryFilm']['posterSrc'] = f'assets/images/{filename}'
                            processed_images += 1

                # 3. Process OG Image (Hero Cover)
                if 'couple' in config and isinstance(config['couple'], dict):
                    og_image = config['couple'].get('ogImage', '')
                    if og_image and og_image.startswith('data:image/'):
                        match = re.match(r'^data:image/([a-zA-Z0-9+]+);base64,(.+)$', og_image)
                        if match:
                            raw_ext = match.group(1).lower()
                            ext = 'jpg' if raw_ext in ('jpeg', 'jpg') else ('png' if raw_ext == 'png' else 'webp')
                            filename = f'hero_{timestamp}.{ext}'
                            filepath = os.path.join(IMAGES_DIR, filename)
                            with open(filepath, 'wb') as f:
                                f.write(base64.b64decode(match.group(2)))
                            config['couple']['ogImage'] = f'assets/images/{filename}'
                            processed_images += 1

                # 4. Process Video File
                if 'memoryFilm' in config and isinstance(config['memoryFilm'], dict):
                    video_src = config['memoryFilm'].get('videoSrc', '')
                    if video_src and video_src.startswith('data:video/'):
                        match = re.match(r'^data:video/([a-zA-Z0-9+]+);base64,(.+)$', video_src)
                        if match:
                            raw_ext = match.group(1).lower()
                            ext = 'webm' if raw_ext == 'webm' else ('mov' if raw_ext in ('quicktime', 'mov') else 'mp4')
                            filename = f'video_{timestamp}.{ext}'
                            os.makedirs(VIDEO_DIR, exist_ok=True)
                            filepath = os.path.join(VIDEO_DIR, filename)
                            with open(filepath, 'wb') as f:
                                f.write(base64.b64decode(match.group(2)))
                            config['memoryFilm']['videoSrc'] = f'assets/video/{filename}'
                            processed_images += 1

                # Timestamp metadata
                config['updatedAt'] = timestamp
                log(f"Saved {processed_images} uploaded images to {IMAGES_DIR}. Writing config.js...")

                # 4. Generate clean config.js
                groom_name = config.get('groom', {}).get('name', 'Tuấn Anh')
                bride_name = config.get('bride', {}).get('name', 'Hoàng Thúy')
                update_str = time.strftime('%Y-%m-%d %H:%M:%S')

                file_content = f"""/**
 * WEDDING CONFIGURATION STORE (Đồng bộ trực tiếp từ Admin Máy Chủ)
 * Cặp đôi: {groom_name} & {bride_name}
 * Cập nhật: {update_str}
 */

const DEFAULT_WEDDING_CONFIG = {json.dumps(config, ensure_ascii=False, indent=2)};

function getActiveWeddingConfig() {{
  try {{
    const savedStr = localStorage.getItem('wedding_custom_config');
    if (savedStr) {{
      const saved = JSON.parse(savedStr);
      if (DEFAULT_WEDDING_CONFIG.updatedAt && (!saved.updatedAt || DEFAULT_WEDDING_CONFIG.updatedAt >= saved.updatedAt)) {{
        localStorage.removeItem('wedding_custom_config');
        return JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));
      }}
      return deepMerge(DEFAULT_WEDDING_CONFIG, saved);
    }}
  }} catch (e) {{
    console.warn('Lỗi đọc cấu hình localStorage:', e);
  }}
  return JSON.parse(JSON.stringify(DEFAULT_WEDDING_CONFIG));
}}

function deepMerge(target, source) {{
  const output = Object.assign({{}}, target);
  if (isObject(target) && isObject(source)) {{
    Object.keys(source).forEach(key => {{
      if (isObject(source[key])) {{
        if (!(key in target)) Object.assign(output, {{ [key]: source[key] }});
        else output[key] = deepMerge(target[key], source[key]);
      }} else {{
        output[key] = source[key];
      }}
    }});
  }}
  return output;
}}

function isObject(item) {{
  return item && typeof item === 'object' && !Array.isArray(item);
}}

function saveActiveWeddingConfig(cfg) {{
  try {{
    localStorage.setItem('wedding_custom_config', JSON.stringify(cfg));
    return true;
  }} catch (e) {{
    console.error('Lỗi lưu cấu hình localStorage:', e);
    return false;
  }}
}}

function resetActiveWeddingConfig() {{
  localStorage.removeItem('wedding_custom_config');
}}

function generateVietQRUrl(bankCode, accountNo, accountName, memo, template = 'compact2') {{
  if (!bankCode || !accountNo) return '';
  return `https://img.vietqr.io/image/${{bankCode}}-${{accountNo}}-${{template}}.png?accountName=${{encodeURIComponent(accountName || '')}}&addInfo=${{encodeURIComponent(memo || '')}}`;
}}

window.DEFAULT_WEDDING_CONFIG = DEFAULT_WEDDING_CONFIG;
window.getActiveWeddingConfig = getActiveWeddingConfig;
window.saveActiveWeddingConfig = saveActiveWeddingConfig;
window.resetActiveWeddingConfig = resetActiveWeddingConfig;
window.generateVietQRUrl = generateVietQRUrl;
window.WEDDING_CONFIG = getActiveWeddingConfig();
"""

                with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
                    f.write(file_content)

                # 5. Sync to backup directory (/opt/uavdemo/thuybeo) if exists
                if os.path.isdir(BACKUP_ROOT):
                    try:
                        backup_config = os.path.join(BACKUP_ROOT, 'js', 'config.js')
                        os.makedirs(os.path.dirname(backup_config), exist_ok=True)
                        with open(backup_config, 'w', encoding='utf-8') as f:
                            f.write(file_content)
                        backup_images = os.path.join(BACKUP_ROOT, 'assets', 'images')
                        os.makedirs(backup_images, exist_ok=True)
                        for fn in os.listdir(IMAGES_DIR):
                            src_f = os.path.join(IMAGES_DIR, fn)
                            dst_f = os.path.join(backup_images, fn)
                            if os.path.isfile(src_f) and not os.path.exists(dst_f):
                                import shutil
                                shutil.copy2(src_f, dst_f)
                    except Exception as b_err:
                        log(f"Notice: Backup sync error: {b_err}")

                # 6. Update static og:image in index.html for instant social previews
                og_img_path = config.get('couple', {}).get('ogImage', '')
                if og_img_path:
                    for root_dir in (WEB_ROOT, BACKUP_ROOT):
                        idx_file = os.path.join(root_dir, 'index.html')
                        if os.path.isfile(idx_file):
                            try:
                                with open(idx_file, 'r', encoding='utf-8') as f:
                                    html = f.read()
                                html = re.sub(r'<meta property="og:image" content="[^"]*">', f'<meta property="og:image" content="{og_img_path}">', html)
                                with open(idx_file, 'w', encoding='utf-8') as f:
                                    f.write(html)
                            except Exception as h_err:
                                log(f"Notice: HTML og:image update error: {h_err}")

                log("Successfully updated config.js and synced on server!")
                resp = json.dumps({'success': True, 'config': config, 'message': 'Đã lưu cấu hình lên máy chủ!'}).encode('utf-8')
                self.send_response(200)
                self._send_cors_headers()
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(resp)))
                self.end_headers()
                self.wfile.write(resp)

            except Exception as e:
                log(f"Error processing save-config: {e}")
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
    log("Starting Threaded Wedding API Server on 0.0.0.0:8081...")
    server = ThreadedHTTPServer(('0.0.0.0', 8081), WeddingHandler)
    server.serve_forever()
