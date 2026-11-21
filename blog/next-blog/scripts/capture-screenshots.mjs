// Captures the Keystone pages from the static export (out/) into
// docs/screenshots/ so changes can be reviewed in the commit. Run with
// `npm run screenshots` (it builds first).
//
// Uses puppeteer-core with an already-installed Chrome for Testing, so CI never
// downloads a browser. Set PUPPETEER_EXECUTABLE_PATH to choose one; otherwise
// the newest one in ~/.cache/puppeteer is used. Shots are 1x.
import { createReadStream, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'out');
const out = path.join(root, 'docs', 'screenshots');

function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const cache = path.join(os.homedir(), '.cache', 'puppeteer', 'chrome');
  if (!existsSync(cache)) return null;
  const candidates = readdirSync(cache).sort().reverse();
  for (const dir of candidates) {
    for (const rel of [
      'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
      'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
      'chrome-linux64/chrome',
      'chrome-win64/chrome.exe',
    ]) {
      const file = path.join(cache, dir, rel);
      if (existsSync(file)) return file;
    }
  }
  return null;
}

const executablePath = findChrome();
if (!executablePath) {
  console.error('No Chrome for Testing found. Run `npx @puppeteer/browsers install chrome@stable` or set PUPPETEER_EXECUTABLE_PATH.');
  process.exit(1);
}
if (!existsSync(site)) {
  console.error('No out/ folder. Run `npm run build` first.');
  process.exit(1);
}

const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain' };
// A tiny static server for out/, with trailing-slash folders served as index.html.
const server = http.createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(site, pathname);
  if (!file.startsWith(site)) return void res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!existsSync(file)) return void res.writeHead(404).end('not found');
  res.writeHead(200, { 'Content-Type': types[path.extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;

mkdirSync(out, { recursive: true });
for (const file of readdirSync(out)) if (file.endsWith('.png')) rmSync(path.join(out, file));

const pages = [
  ['keystone-support', '/keystone/support/'],
  ['keystone-bye', '/keystone/bye/'],
  ['keystone-privacy', '/privacy/keystone/'],
];
const viewports = [
  ['desktop', { width: 1100, height: 900 }],
  ['phone', { width: 390, height: 844 }],
];

const browser = await puppeteer.launch({ executablePath, headless: true });
let count = 0;
try {
  for (const scheme of ['light', 'dark']) {
    for (const [name, pathname] of pages) {
      for (const [device, viewport] of viewports) {
        const page = await browser.newPage();
        await page.setViewport(viewport);
        // The site's theme comes from next-themes' saved choice (key "theme"), not the system setting.
        await page.evaluateOnNewDocument((value) => localStorage.setItem('theme', value), scheme);
        await page.goto(`${base}${pathname}`, { waitUntil: 'networkidle0' });
        await page.screenshot({ path: path.join(out, `${name}-${device}-${scheme}.png`), fullPage: true });
        await page.close();
        count++;
      }
    }
  }
  console.log(`Saved ${count} screenshots to ${path.relative(root, out)}/`);
} finally {
  await browser.close();
  server.close();
}
