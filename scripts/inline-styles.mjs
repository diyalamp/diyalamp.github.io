// Keep the single-page site's critical styles in its first response.
import assert from 'node:assert/strict';
import {readFile, writeFile} from 'node:fs/promises';

const page = new URL('../dist/index.html', import.meta.url);
const css = await readFile(new URL('../dist/style.css', import.meta.url), 'utf8');
assert(!css.toLowerCase().includes('</style'), 'Unexpected closing style tag');

const html = await readFile(page, 'utf8');
const release = html.match(/app\.js\?v=([a-z0-9-]+)"/i)?.[1];
assert(release, 'Expected a versioned application script');
const pattern = /<style id="page-styles"[\s\S]*?<\/style>|<link rel="stylesheet" href="style\.css[^"]*">/g;
assert.equal([...html.matchAll(pattern)].length, 1,
  'Expected exactly one generated stylesheet location');
const style = `<style id="page-styles" data-release="${release}">\n${css}\n</style>`;
const updated = html.replace(pattern, () => style);
if (updated !== html) await writeFile(page, updated);
