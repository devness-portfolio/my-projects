import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const htmlFiles = readdirSync(rootDir)
  .filter((file) => file.endsWith('.html'))
  .sort();
const jsFiles = ['assets/js/script.js', 'assets/js/prayer-time.js'];
const errors = [];

const forbiddenHtmlPatterns = [
  { pattern: './js/', message: 'stale ./js path' },
  { pattern: './css/', message: 'stale ./css path' },
  { pattern: 'prayer-times.js', message: 'old prayer-times.js filename' },
  { pattern: '{/*', message: 'JSX-style comment in HTML' },
  { pattern: '[Mosque Name]', message: 'mosque name placeholder' },
];

for (const file of htmlFiles) {
  const html = readFileSync(path.join(rootDir, file), 'utf8');

  for (const { pattern, message } of forbiddenHtmlPatterns) {
    if (html.includes(pattern)) {
      errors.push(`${file}: ${message}`);
    }
  }

  if (!html.includes('assets/img/favicon.svg')) {
    errors.push(`${file}: missing normalized favicon`);
  }

  if (!html.includes('assets/css/site.css')) {
    errors.push(`${file}: missing runtime stylesheet`);
  }

  if (!html.includes('assets/js/script.js')) {
    errors.push(`${file}: missing shared script include`);
  }

  if (
    html.includes('id="prayer-times-container"') &&
    !html.includes('assets/js/prayer-time.js')
  ) {
    errors.push(`${file}: prayer times section missing prayer-time.js`);
  }

  const refs = html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g);
  for (const [, rawRef] of refs) {
    const normalizedRef = rawRef.replace(/^\.\//, '');
    if (normalizedRef.startsWith('assets/')) {
      const refPath = path.join(rootDir, normalizedRef);
      if (!existsSync(refPath)) {
        errors.push(`${file}: missing local asset ${rawRef}`);
      }
    }
  }
}

for (const file of jsFiles) {
  execFileSync(process.execPath, ['--check', file], { stdio: 'inherit' });
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Site check passed for ${htmlFiles.length} HTML files.`);
