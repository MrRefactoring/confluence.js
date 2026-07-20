/**
 * Stamps the version of a dev-channel snapshot.
 *
 * Run after `changeset version`, which has already moved package.json to the
 * version this branch would release. This turns that into `<base>-dev.<n>`,
 * where n comes from the registry: the highest `<base>-dev.*` already published,
 * plus one. npm is the source of truth, so nothing has to be committed back and
 * the script works from any branch.
 *
 * Runs on bare `node` — the types here are erasable, so Node strips them without
 * a compile step. Keep it that way: no enums, no namespaces, no parameter
 * properties, or it stops being runnable.
 *
 * Run: pnpm run version:dev
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const packagePath = resolve(import.meta.dirname, '..', 'package.json');
const manifest = JSON.parse(readFileSync(packagePath, 'utf8')) as { name: string; version: string };

/** Every version of this package on npm, or [] if it has never been published. */
function publishedVersions(name: string): string[] {
  try {
    const stdout = execFileSync('npm', ['view', name, 'versions', '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    const parsed: unknown = JSON.parse(stdout);

    // A single-release package comes back as a bare string, not an array.
    return Array.isArray(parsed) ? (parsed as string[]) : [String(parsed)];
  } catch {
    return [];
  }
}

/**
 * The release this snapshot leads to.
 *
 * With changesets pending, `changeset version` has already bumped package.json
 * and that is the answer. With none pending the version still names the last
 * release, and if it is already on npm the snapshot would sort *below* it — so
 * take the next patch instead.
 */
function baseVersion(current: string, published: string[]): string {
  if (!published.includes(current)) return current;

  const [major, minor, patch] = current.split('.').map(Number);

  return `${major}.${minor}.${patch + 1}`;
}

const published = publishedVersions(manifest.name);
const base = baseVersion(manifest.version, published);

const counter = published
  .map(version => new RegExp(`^${base.replaceAll('.', '\\.')}-dev\\.(\\d+)$`).exec(version))
  .filter(match => match !== null)
  .reduce((highest, match) => Math.max(highest, Number(match[1]) + 1), 0);

manifest.version = `${base}-dev.${counter}`;

writeFileSync(packagePath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(manifest.version);
