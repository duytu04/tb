const fs = require('fs');

const adminHtml = fs.readFileSync('f:/thuybeo/admin.html', 'utf8');

// Find all inputs with their type, id, and nearby label
const regex = /<input[^>]+>/gi;
let match;
const inputs = [];
while ((match = regex.exec(adminHtml)) !== null) {
  inputs.push(match[0]);
}

console.log('Total inputs:', inputs.length);
inputs.forEach(inp => {
  if (inp.includes('image') || inp.includes('poster') || inp.includes('photo') || inp.includes('src') || inp.includes('file') || inp.includes('gallery')) {
    console.log('Media-related input:', inp);
  }
});
