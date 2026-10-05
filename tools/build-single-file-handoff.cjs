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

for (const stylesheet of ['css/style.css', 'css/silk.css']) {
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

// The handoff is a static visual reference. Runtime scripts are deliberately
// removed so the full invitation is visible immediately when an AI or browser
// opens the single file.
html = html.replace(
  /\s*<script(?:\s+type="module")?(?:\s+async)?\s+src="js\/[^">]+"><\/script>/gi,
  '',
);
html = html.replace(/<html([^>]*)\sclass="invitation-locked"([^>]*)>/i, '<html$1$2>');
html = html.replace(/<body([^>]*)\sclass="invitation-locked"([^>]*)>/i, '<body$1$2>');
html = html.replace(/href="admin\.html"/g, 'href="#"');

const staticPreviewCss = `
  /* AI handoff: show the complete post-opening mobile page as editable HTML. */
  html, body { overflow: visible !important; }
  #envelope-overlay { display: none !important; }
  .reveal-on-scroll,
  .reveal-on-scroll.revealed {
    opacity: 1 !important;
    transform: none !important;
    visibility: visible !important;
  }
`;
html = html.replace('</head>', `<style data-ai-handoff-preview>${staticPreviewCss}</style>\n</head>`);

const handoffInstructions = `
<!--
AI / FIGMA REDRAW INSTRUCTIONS
- Treat this as the source of truth for a 390 px wide mobile design.
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
  if (!html.includes(relativePath)) continue;

  const base64 = fs.readFileSync(assetPath).toString('base64');
  const dataUri = `data:${mimeType};base64,${base64}`;
  html = html.split(relativePath).join(dataUri);
}

fs.writeFileSync(outputPath, html, 'utf8');

const remainingLocalReferences = [
  ...html.matchAll(/(?:src|href|poster|data-src)="((?:assets|css|js)\/[^"?#]+)/g),
].map((match) => match[1]);

if (remainingLocalReferences.length) {
  throw new Error(`Unresolved local references: ${[...new Set(remainingLocalReferences)].join(', ')}`);
}

console.log(`Created ${outputPath}`);
console.log(`Size: ${fs.statSync(outputPath).size} bytes`);
