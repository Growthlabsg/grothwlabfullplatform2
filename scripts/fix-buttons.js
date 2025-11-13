/*
 Adds type="button" to raw <button> opening tags that lack a type attribute across app/ and components/.
 Conservative textual transform: only modifies the opening tag segment before the matching '>'.
*/
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIRS = [path.join(ROOT, 'app'), path.join(ROOT, 'components')];

function listFilesRecursively(dir, exts = ['.tsx', '.jsx']) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...listFilesRecursively(full, exts));
    } else if (exts.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let text = original;
  let idx = 0;
  let changes = 0;

  while (idx < text.length) {
    const start = text.indexOf('<button', idx);
    if (start === -1) break;

    // Ensure it's not something like <buttoned or <button::>
    const afterStart = start + '<button'.length;
    const nextChar = text[afterStart] || '';
    if (!/[\s>/]/.test(nextChar)) {
      idx = afterStart;
      continue;
    }

    // Find end of opening tag '>' accounting for quotes
    let i = afterStart;
    let inSingle = false;
    let inDouble = false;
    let foundEnd = -1;
    while (i < text.length) {
      const ch = text[i];
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === '>' && !inSingle && !inDouble) { foundEnd = i; break; }
      // naive skip for JSX spread etc is fine; we aren't parsing
      i++;
    }
    if (foundEnd === -1) break;

    const tagContent = text.slice(start, foundEnd + 1); // includes '>'
    // Skip closing tags or malformed
    if (tagContent.startsWith('</')) { idx = foundEnd + 1; continue; }

    // If tagContent already contains type=, skip
    if (/\btype\s*=/.test(tagContent)) {
      idx = foundEnd + 1;
      continue;
    }

    // Insert type="button" after <button
    const insertPos = afterStart;
    const before = text.slice(0, insertPos);
    const after = text.slice(insertPos);
    text = `${before} type="button"${after}`;
    changes++;
    // Move idx past the end of this tag to avoid infinite loop
    idx = foundEnd + ' type="button"'.length + 1;
  }

  if (changes > 0 && text !== original) {
    fs.writeFileSync(filePath, text, 'utf8');
    console.log(`Fixed ${changes} button(s) in ${filePath}`);
  }
}

function main() {
  const files = TARGET_DIRS.flatMap((d) => listFilesRecursively(d));
  for (const f of files) fixFile(f);
}

main();


