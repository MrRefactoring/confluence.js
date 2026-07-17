/**
 * Post-processes the TypeDoc output for VitePress. Runs as part of `docs:api`.
 *
 * Three jobs:
 *
 * 1. **Escape stray `<` in prose.** VitePress compiles every markdown file as a
 *    Vue template, and Atlassian's endpoint descriptions carry raw markup and
 *    placeholders — `<taskId>`, `<url>`, an unclosed `<pre><code>`. Vue reads
 *    those as elements and the build dies on "Element is missing end tag".
 *
 * 2. **Trim the sidebar.** TypeDoc lists every page it writes, and `models` +
 *    `parameters` are the bulk of them — VitePress embeds the whole tree into
 *    every page's hydration state, so leaving them in inflates each HTML file by
 *    hundreds of kilobytes. They stay reachable: every function signature links
 *    to the types it uses. Only the navigation tree drops them.
 *
 * 3. **Mirror the reference under `/ru/api/`.** The reference itself is
 *    English (it comes from Atlassian's own descriptions), but VitePress's
 *    language switcher rewrites `/api/*` → `/ru/api/*`, so the route has to
 *    resolve. `hreflang` marks the two as the same page. The RU sidebar is the
 *    same tree with its links re-prefixed, so navigating inside the reference
 *    keeps you in the locale you chose.
 */
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'node:fs/promises';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = resolve(root, 'docs/api');
const ruApiDir = resolve(root, 'docs/ru/api');
const sidebarPath = resolve(apiDir, 'typedoc-sidebar.json');
const ruSidebarPath = resolve(apiDir, 'typedoc-sidebar.ru.json');

/** Sidebar groups that are reachable by link but too numerous to navigate. */
const EXCLUDED_GROUPS = new Set(['models', 'parameters']);

interface SidebarEntry {
  text?: string;
  link?: string;
  items?: SidebarEntry[];
}

if (!existsSync(apiDir)) {
  console.error(`[prepare-api-docs] no TypeDoc output at ${relative(root, apiDir)} — run \`pnpm docs:api\` first.`);
  process.exit(1);
}

/** Drop the excluded groups wherever they sit: they are nested under v1/v2, not top-level. */
function trim(entries: SidebarEntry[]): SidebarEntry[] {
  return entries
    .filter(entry => !(entry.text && EXCLUDED_GROUPS.has(entry.text)))
    .map(entry => (entry.items ? { ...entry, items: trim(entry.items) } : entry));
}

function count(entries: SidebarEntry[]): number {
  return entries.reduce((total, entry) => total + 1 + (entry.items ? count(entry.items) : 0), 0);
}

/** Stand-in for a parked code span. U+0000 cannot occur in the markdown TypeDoc emits. */
const SENTINEL = '\u0000';

/**
 * Escape `<` everywhere Vue would read it as a tag: outside fenced blocks and
 * outside inline code. `>` is left alone — it is harmless on its own, and
 * escaping it would eat blockquote markers.
 */
function escapeProseAngleBrackets(markdown: string): string {
  let inFence = false;

  return markdown
    .split('\n')
    .map(line => {
      if (/^\s*```/.test(line)) {
        inFence = !inFence;

        return line;
      }

      if (inFence || !line.includes('<')) return line;

      const spans: string[] = [];
      const masked = line.replace(/`[^`]*`/g, span => `${SENTINEL}${spans.push(span) - 1}${SENTINEL}`);

      return masked
        .replace(/</g, '&lt;')
        .replace(new RegExp(`${SENTINEL}(\\d+)${SENTINEL}`, 'g'), (_, index: string) => spans[Number(index)]);
    })
    .join('\n');
}

let escapedFiles = 0;

for await (const file of glob(`${apiDir}/**/*.md`)) {
  const original = readFileSync(file, 'utf8');
  const escaped = escapeProseAngleBrackets(original);

  if (escaped !== original) {
    writeFileSync(file, escaped);
    escapedFiles += 1;
  }
}

const sidebar = JSON.parse(readFileSync(sidebarPath, 'utf8')) as SidebarEntry[];
const trimmed = trim(sidebar);

writeFileSync(sidebarPath, JSON.stringify(trimmed));
writeFileSync(ruSidebarPath, JSON.stringify(trimmed).replaceAll('"/api/', '"/ru/api/'));

if (existsSync(ruApiDir)) rmSync(ruApiDir, { recursive: true, force: true });
cpSync(apiDir, ruApiDir, { recursive: true });

console.log(`[prepare-api-docs] escaped stray markup in ${escapedFiles} page(s)`);
console.log(`[prepare-api-docs] sidebar ${count(sidebar)} → ${count(trimmed)} entries (models, parameters dropped)`);
console.log(`[prepare-api-docs] mirrored ${relative(root, apiDir)} → ${relative(root, ruApiDir)}`);
