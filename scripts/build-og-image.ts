/**
 * Rasterises `docs/public/og-image.svg` to the PNG the social meta tags point at.
 *
 * Crawlers do not render SVG for `og:image`, so the PNG is the artifact that
 * matters and it is committed. This script only needs running when the SVG
 * changes — hence it is not part of `docs:build`.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = resolve(root, 'docs/public/og-image.svg');
const pngPath = resolve(root, 'docs/public/og-image.png');

const resvg = new Resvg(readFileSync(svgPath, 'utf8'), {
  fitTo: { mode: 'width', value: 1200 },
  background: 'rgba(0,0,0,0)',
  font: { loadSystemFonts: true, defaultFontFamily: 'Helvetica' },
});

const png = resvg.render().asPng();

writeFileSync(pngPath, png);

console.log(`[build-og-image] ${relative(root, pngPath)} — ${(png.length / 1024).toFixed(1)} KB, 1200x630`);
