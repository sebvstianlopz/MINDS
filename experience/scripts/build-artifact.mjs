// Turns the single-file Vite build (dist/index.html) into a claude.ai artifact page:
// a body fragment (the host adds doctype/head/body) plus the public assets beside it.
import { readFileSync, writeFileSync, mkdirSync, cpSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'dist/index.html'), 'utf8');
const pick = (re) => [...html.matchAll(re)].map((m) => m[0]);

const title = (html.match(/<title>[\s\S]*?<\/title>/) || ['<title>MINDS Inside Your Mind</title>'])[0];
const fontLinks = pick(/<link[^>]+fonts\.(googleapis|gstatic)\.com[^>]*>/g);
const styles = pick(/<style[^>]*>[\s\S]*?<\/style>/g);
const scripts = pick(/<script type="module"[^>]*>[\s\S]*?<\/script>/g);
const body = (html.match(/<body>([\s\S]*?)<\/body>/) || [, ''])[1].replace(/<script[\s\S]*?<\/script>/g, '').trim();

const out = [title, '<meta name="theme-color" content="#050506">', ...fontLinks, ...styles, body, ...scripts].join('\n');
const dest = join(root, 'artifact');
mkdirSync(dest, { recursive: true });
writeFileSync(join(dest, 'index.html'), out);
for (const f of readdirSync(join(root, 'public'))) if (!f.startsWith('.')) cpSync(join(root, 'public', f), join(dest, f), { recursive: true });
console.log('artifact page:', (out.length / 1024).toFixed(0) + ' KB');
