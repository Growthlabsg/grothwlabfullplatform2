/*
 Audits button usage across the codebase to catch common issues:
 - Raw <button> elements missing a type attribute
 - Raw <button> elements without onClick (and not explicit submit/reset)
 - Icon-only <Button size="icon"> without aria-label or title
 - Elements using role="button" that are not native buttons
*/

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIRS = [path.join(ROOT, 'app'), path.join(ROOT, 'components')];

function listFilesRecursively(dir, exts = ['.tsx', '.jsx']) {
  const entries = fs.existsSync(dir) ? fs.readdirSync(dir, { withFileTypes: true }) : [];
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

function getJsxAttributesMap(attrs) {
  const map = new Map();
  for (const attr of attrs) {
    if (ts.isJsxAttribute(attr) && attr.name) {
      const key = attr.name.text;
      let value = undefined;
      if (attr.initializer) {
        if (ts.isStringLiteral(attr.initializer)) {
          value = attr.initializer.text;
        } else if (ts.isJsxExpression(attr.initializer)) {
          value = attr.initializer.expression ? attr.initializer.expression.getText() : undefined;
        } else {
          value = attr.initializer.getText();
        }
      }
      map.set(key, value);
    } else if (ts.isJsxSpreadAttribute(attr)) {
      map.set('...spread', attr.getText());
    }
  }
  return map;
}

function auditFile(filePath) {
  const sourceText = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const issues = [];

  function visit(node) {
    if (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) {
      const tagName = (node.tagName && node.tagName.getText()) || '';
      const attrs = node.attributes ? node.attributes.properties : [];
      const attrMap = getJsxAttributesMap(attrs);

      // Raw native button checks
      if (tagName === 'button') {
        const hasType = attrMap.has('type');
        if (!hasType) {
          issues.push({ type: 'RawButtonMissingType', loc: node.getStart(), message: '<button> missing type attribute' });
        }
        const typeValue = (attrMap.get('type') || '').replace(/['"`]/g, '');
        const hasOnClick = attrMap.has('onClick');
        if (!hasOnClick && typeValue !== 'submit' && typeValue !== 'reset') {
          issues.push({ type: 'RawButtonNoOnClick', loc: node.getStart(), message: '<button> has no onClick (and not submit/reset)' });
        }
      }

      // Role="button" on non-button elements
      if (tagName !== 'button' && attrMap.get('role') === 'button') {
        issues.push({ type: 'RoleButtonNonNative', loc: node.getStart(), message: `role="button" used on <${tagName}>` });
      }

      // Our shared Button: icon-only accessibility
      if (tagName === 'Button') {
        const sizeValue = (attrMap.get('size') || '').replace(/['"`]/g, '');
        const hasAriaLabel = attrMap.has('aria-label');
        const hasTitle = attrMap.has('title');
        if (sizeValue === 'icon' && !hasAriaLabel && !hasTitle) {
          issues.push({ type: 'IconButtonMissingLabel', loc: node.getStart(), message: '<Button size="icon"> without aria-label or title' });
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (issues.length > 0) {
    const lines = sourceText.split(/\r?\n/);
    for (const issue of issues) {
      const { line, character } = sourceFile.getLineAndCharacterOfPosition(issue.loc);
      const codeLine = lines[line] ?? '';
      console.log(`${filePath}:${line + 1}:${character + 1}: ${issue.type}: ${issue.message}`);
      console.log(`  ${codeLine.trim()}`);
    }
  }
}

function main() {
  const files = TARGET_DIRS.flatMap((d) => listFilesRecursively(d));
  let total = 0;
  for (const f of files) {
    auditFile(f);
    total++;
  }
  console.error(`\nAudited ${total} files.`);
}

main();


