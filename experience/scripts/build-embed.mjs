// Minifies and copies the store-homepage build into the store prototype: mind.js plus the garment cut-outs it loads.
import { cpSync } from 'node:fs';
import { buildSync } from 'esbuild';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const store = join(root, '..', 'prototype');
// Vite's ES library mode keeps whitespace; minify the module fully for the store.
buildSync({ entryPoints: [join(root, 'dist-embed', 'mind.js')], outfile: join(store, 'mind.js'), minify: true, format: 'esm', target: 'es2020', allowOverwrite: true, legalComments: 'none' });
cpSync(join(root, 'public', 'garments'), join(store, 'garments'), { recursive: true });
console.log('copied mind.js and garments/ into prototype/');
