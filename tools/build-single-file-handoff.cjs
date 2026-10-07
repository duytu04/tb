const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const sourceRoot = projectRoot;
const outputPath = path.join(projectRoot, 'mobile-ui-single-file.html');

const readUtf8 = (filePath) => fs.readFileSync(filePath, 'utf8');

const mimeTypes = new Map([
  ['.svg', 'image/svg+xml'],
  ['.webp', 'image/webp'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.mp3', 'audio/mpeg'],
]);

function listFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath];
  });
}

let html = readUtf8(path.join(sourceRoot, 'index.html'));

// The production markup points to an optional video that is not present in the
// working tree. Keep its poster in the visual handoff and drop only that broken
// local reference.
html = html.replace(/\s+data-src="assets\/video\/hanh-trinh\.mp4"/g, '');

for (const stylesheet of [
  'css/style.css',
  'css/silk.css',
  'css/mobile-fixes.css',
  'css/opening-album.css',
  'css/opening-waiting.css',
  'css/film-reel.css',
]) {
  const css = readUtf8(path.join(sourceRoot, stylesheet));
  const escaped = stylesheet.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const linkPattern = new RegExp(
    `<link\\s+rel="stylesheet"\\s+href="${escaped}(?:\\?[^"\\s]*)?"\\s*>`,
    'i',
  );
  html = html.replace(
    linkPattern,
    `<style data-inlined-from="${stylesheet}">\n${css}\n</style>`,
  );
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeInlineScript(source) {
  return source.replace(/<\/script/gi, '<\\/script');
}

// Inline the complete public-site runtime in the same order as the production
// page so the one-file handoff retains all UI interactions.
for (const scriptPath of [
  'js/config.js',
  'js/opening-album-ui.js',
  'js/opening.js',
  'js/music.js',
  'js/app.js',
]) {
  const source = escapeInlineScript(readUtf8(path.join(sourceRoot, scriptPath)));
  const pattern = new RegExp(
    `<script\\s+src="${escapeRegExp(scriptPath)}(?:\\?[^"\\s]*)?"\\s*><\\/script>`,
    'i',
  );
  const standaloneOverrides = scriptPath === 'js/config.js'
    ? `<script data-standalone-overrides>
document.addEventListener('DOMContentLoaded', () => {
  const originalGenerateVietQRUrl = window.generateVietQRUrl;
  const embeddedQrByAccount = new Map([
    [window.WEDDING_CONFIG?.banking?.groom?.accountNumber, document.querySelector('#tab-groom .qr-image-display')?.src],
    [window.WEDDING_CONFIG?.banking?.bride?.accountNumber, document.querySelector('#tab-bride .qr-image-display')?.src],
  ]);
  window.generateVietQRUrl = (bankCode, accountNo, accountName, memo, template) =>
    embeddedQrByAccount.get(accountNo)
    || originalGenerateVietQRUrl(bankCode, accountNo, accountName, memo, template);
}, { once: true });
</script>`
    : '';
  html = html.replace(
    pattern,
    `<script data-inlined-from="${scriptPath}">\n${source}\n</script>${standaloneOverrides}`,
  );
}

const sceneModuleSource = readUtf8(
  path.join(sourceRoot, 'js/generated/silk-scene-C3YXL0wU.js'),
);
const sceneModuleUri = `data:text/javascript;base64,${Buffer.from(sceneModuleSource).toString('base64')}`;
const silkBundle = escapeInlineScript(
  readUtf8(path.join(sourceRoot, 'js/generated/silk.js'))
    .replace('./silk-scene-C3YXL0wU.js', sceneModuleUri),
);
html = html.replace(
  /<script\s+type="module"\s+async\s+src="js\/generated\/silk\.js(?:\?[^"\s]*)?"\s*><\/script>/i,
  `<script type="module" data-inlined-from="js/generated/silk.js">\n${silkBundle}\n</script>`,
);

const handoffInstructions = `
<!--
AI / FIGMA REDRAW INSTRUCTIONS
- Treat this as the source of truth for a 390 px wide mobile design.
- This file also contains the complete public-site interaction runtime.
- Recreate the page with editable frames, text, vectors, image fills, Auto Layout,
  reusable components and design variables. Do not use a full-page screenshot.
- Preserve the Vietnamese copy, section order, embedded imagery and fixed five-item
  bottom dock. The center "Mừng Cưới" action is the highlighted gold control.
- Fonts: Playfair Display for headings, Alex Brush for script names, and
  Be Vietnam Pro for body copy.
- Core colors: #FAF7F2, #F4EFEB, #FFFFFF, #C5A059, #8E6D2F,
  #2C2621, #6E665D and #9E2626.
-->
`;
html = html.replace('<!DOCTYPE html>', `<!DOCTYPE html>${handoffInstructions}`);

const assetsRoot = path.join(sourceRoot, 'assets');
for (const assetPath of listFiles(assetsRoot)) {
  const extension = path.extname(assetPath).toLowerCase();
  const mimeType = mimeTypes.get(extension);
  if (!mimeType) continue;

  const relativePath = path.relative(sourceRoot, assetPath).split(path.sep).join('/');
  if (!html.includes(relativePath) && !html.includes(`../${relativePath}`) && !html.includes(`/${relativePath}`)) continue;

  const base64 = fs.readFileSync(assetPath).toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;
  html = html.split(`../${relativePath}`).join(dataUri);
  html = html.split(`/${relativePath}`).join(dataUri);
  html = html.split(relativePath).join(dataUri);
}

// The repository currently has no memory-film MP4. Preserve the interactive
// player's built-in unavailable state instead of leaving a broken file path.
html = html.split('assets/video/hanh-trinh.mp4').join('data:video/mp4;base64,');

fs.writeFileSync(outputPath, html, 'utf8');

const remainingLocalReferences = [
  ...html.matchAll(/(?:src|href|poster|data-src)="((?:assets|css|js)\/[^"?#]+)/g),
].map((match) => match[1]);

if (remainingLocalReferences.length) {
  throw new Error(`Unresolved local references: ${[...new Set(remainingLocalReferences)].join(', ')}`);
}

console.log(`Created ${outputPath}`);
console.log(`Size: ${fs.statSync(outputPath).size} bytes`);
