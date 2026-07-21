/**
 * Publishes the package — but only if this version is not already on the registry.
 *
 * changesets/action runs this on every master push with no pending changesets (the publish path). When the version PR
 * has just merged, that is a new version to publish; on any other such push the version is already out and a plain
 * `pnpm publish` would fail with "cannot publish over the previously published version". Checking the registry first
 * turns that case into a clean no-op — the way `changeset publish` does — while keeping `pnpm publish --provenance`.
 *
 * That command is the point: it is the only one that actually produces the SLSA provenance attestation. pnpm's native
 * publish takes the OIDC trusted-publishing path when id-token is available and, on that path, ignores the provenance
 * config in `.npmrc` and the NPM_CONFIG_PROVENANCE env var alike — 3.0.2 and 3.0.3 shipped unsigned for exactly that
 * reason. Only the explicit `--provenance` flag makes it sign, as 3.0.1 did.
 *
 * Runs on bare `node` — keep the types erasable, as in scripts/schemaAudit.ts.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as { name: string; version: string };

// `npm view pkg@version version` prints the version and exits 0 when it exists, and errors (E404) when it does not.
// A published version is the "nothing to do" case; anything else means this is a new version to ship.
const lookup = spawnSync('npm', ['view', `${pkg.name}@${pkg.version}`, 'version'], { cwd: root, encoding: 'utf8' });

if (lookup.status === 0 && lookup.stdout.trim() !== '') {
  console.log(`${pkg.name}@${pkg.version} is already published — nothing to do.`);
  process.exit(0);
}

console.log(`Publishing ${pkg.name}@${pkg.version} with provenance…`);

const published = spawnSync('pnpm', ['publish', '--no-git-checks', '--provenance'], { cwd: root, stdio: 'inherit' });

process.exit(published.status ?? 1);
