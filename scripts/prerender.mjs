/**
 * Post-build prerender: snapshot each route to dist/{route}/index.html
 * so crawlers get full HTML + per-route meta without executing JS.
 *
 * Uses puppeteer-core + system Chrome (no bundled Chromium download).
 * Skipped when PRERENDER=false or no browser is found.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';
import puppeteer from 'puppeteer-core';
import { PRERENDER_ROUTES } from './prerender-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const port = 4173;
const baseUrl = `http://localhost:${port}`;

const CHROME_PATHS = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ],
};

function resolveChromeExecutable() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const candidates = CHROME_PATHS[process.platform] ?? [];
  return candidates.find((p) => fs.existsSync(p));
}

if (process.env.PRERENDER === 'false') {
  console.log('[prerender] skipped (PRERENDER=false)');
  process.exit(0);
}

if (!fs.existsSync(dist)) {
  console.error('[prerender] dist/ missing — run vite build first');
  process.exit(1);
}

const chromePath = resolveChromeExecutable();
if (!chromePath) {
  console.warn(
    '[prerender] skipped — no Chrome/Chromium found. Install Chrome or set PUPPETEER_EXECUTABLE_PATH.',
  );
  process.exit(0);
}

function routeToFile(route) {
  if (route === '/') return path.join(dist, 'index.html');
  return path.join(dist, route.slice(1), 'index.html');
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const previewServer = await preview({
  root,
  preview: { port, strictPort: true, host: '127.0.0.1' },
});

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

console.log(`[prerender] ${PRERENDER_ROUTES.length} routes → ${dist}`);
console.log(`[prerender] browser: ${chromePath}`);

let failed = 0;

for (const route of PRERENDER_ROUTES) {
  const page = await browser.newPage();
  const url = `${baseUrl}${route}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
    await page.waitForSelector('h1, main', { timeout: 30_000 });
    await sleep(1200);

    const html = await page.content();
    const out = routeToFile(route);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html, 'utf8');
    console.log(`[prerender] ✓ ${route}`);
  } catch (err) {
    failed += 1;
    console.error(`[prerender] ✗ ${route}`, err instanceof Error ? err.message : err);
  } finally {
    await page.close();
  }
}

await browser.close();
await previewServer.close();

if (failed > 0) {
  console.error(`[prerender] ${failed} route(s) failed`);
  process.exit(1);
}

console.log('[prerender] done');
