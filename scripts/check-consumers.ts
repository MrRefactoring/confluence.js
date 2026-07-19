/**
 * Installs the packed tarball into throwaway projects and imports it the way a
 * user would.
 *
 * `pnpm run build` proves the sources compile; attw proves the exports map
 * resolves on paper. Neither runs the published artifact. This does: it packs the
 * package, installs the tarball, and drives each entry point in a real Node
 * process and through a real bundler resolution. Getting `files`, `exports` or a
 * dependency wrong shows up here and nowhere else.
 *
 * Run: pnpm run check:consumers
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const repoRoot = resolve(import.meta.dirname, '..');

function run(command: string, args: string[], cwd: string): string {
  return execFileSync(command, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

/** `npm pack` the repo and return the absolute path of the tarball. */
function packTarball(into: string): string {
  run('npm', ['pack', '--pack-destination', into], repoRoot);

  const tarball = readdirSync(into).find(file => file.endsWith('.tgz'));

  if (!tarball) throw new Error('npm pack produced no tarball');

  return join(into, tarball);
}

interface Consumer {
  name: string;
  /** Extra files to write into the project, keyed by relative path. */
  files: Record<string, string>;
  /** Argv for the command that proves the consumer works. */
  verify: (dir: string) => [string, string[]];
}

const CONFIG = "{ host: 'https://acme.atlassian.net', auth: { type: 'basic', email: 'a@b.co', apiToken: 'x' } }";

/** Runtime smoke: drives every entry point and asserts requests still carry the API path. */
const SMOKE_JS = `
import { createV1Client, createV2Client, ApiError } from 'confluence.js';
import { createClient } from 'confluence.js/core';
import { getPages } from 'confluence.js/v2';
import { searchContentByCQL } from 'confluence.js/v1';
import assert from 'node:assert';

for (const [name, value] of Object.entries({ createV1Client, createV2Client, ApiError, createClient, getPages, searchContentByCQL })) {
  assert.ok(value, name + ' is missing from the published package');
}

const seen = [];

globalThis.fetch = url => {
  seen.push(String(url));

  return Promise.resolve(new Response(null, { status: 204 }));
};

const client = createClient(${CONFIG});

await getPages(client, {});
await searchContentByCQL(client, { cql: 'type=page' });

assert.equal(seen[0], 'https://acme.atlassian.net/wiki/api/v2/pages', 'v2 API path lost in the published build');
assert.ok(seen[1].startsWith('https://acme.atlassian.net/wiki/rest/api/content/search'), 'v1 API path lost in the published build');

const v2 = createV2Client(${CONFIG});
const v1 = createV1Client(${CONFIG});

assert.ok(v2.page && v2.space, 'v2 factory namespaces missing');
assert.ok(v1.content && v1.space, 'v1 factory namespaces missing');

console.log('  ' + Object.keys(v2).length + ' v2 and ' + Object.keys(v1).length + ' v1 namespaces, both API paths intact');
`;

/**
 * Type-resolution smoke. Deliberately no runtime: these consumers exist to prove
 * the shipped .d.ts files resolve and infer through every subpath under strict
 * settings, which is where a malformed exports map shows up.
 */
const SMOKE_TS = `
import { createV1Client, createV2Client, ApiError } from 'confluence.js';
import type { ClientConfig } from 'confluence.js';
import { createClient } from 'confluence.js/core';
import { getPages } from 'confluence.js/v2';
import type { Page } from 'confluence.js/v2';
import { searchContentByCQL } from 'confluence.js/v1';

const config: ClientConfig = ${CONFIG};

const client = createClient(config);
const v2 = createV2Client(config);
const v1 = createV1Client(config);

// Inference has to survive the package boundary, not just resolve.
export async function readPage(id: string): Promise<Page> {
  return v2.page.getPageById({ id: Number(id) });
}

export async function listPages(): Promise<unknown> {
  return getPages(client, {});
}

export async function search(cql: string): Promise<unknown> {
  return searchContentByCQL(client, { cql });
}

export async function spaces(): Promise<unknown> {
  return v1.space.createSpace({ key: 'X', name: 'X' });
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
`;

const CONSUMERS: Consumer[] = [
  {
    name: 'node-esm',
    files: { 'smoke.mjs': SMOKE_JS },
    verify: dir => ['node', [join(dir, 'smoke.mjs')]],
  },
  {
    name: 'ts-strict',
    // Type resolution under the strictest settings a consumer is likely to use,
    // and under node16 — the resolver that trips on a malformed exports map.
    files: {
      'smoke.ts': SMOKE_TS,
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'node16',
            moduleResolution: 'node16',
            strict: true,
            noEmit: true,
            skipLibCheck: false,
            types: ['node'],
          },
          include: ['smoke.ts'],
        },
        null,
        2,
      ),
    },
    verify: dir => [join(dir, 'node_modules/.bin/tsc'), ['-p', join(dir, 'tsconfig.json')]],
  },
  {
    name: 'ts-bundler',
    files: {
      'smoke.ts': SMOKE_TS,
      'tsconfig.json': JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2022',
            module: 'ESNext',
            moduleResolution: 'bundler',
            strict: true,
            noEmit: true,
            types: ['node'],
          },
          include: ['smoke.ts'],
        },
        null,
        2,
      ),
    },
    verify: dir => [join(dir, 'node_modules/.bin/tsc'), ['-p', join(dir, 'tsconfig.json')]],
  },
];

const workspace = mkdtempSync(join(tmpdir(), 'confluence-consumers-'));
let failures = 0;

try {
  console.log('packing…');
  const tarball = packTarball(workspace);

  for (const consumer of CONSUMERS) {
    const dir = join(workspace, consumer.name);

    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'package.json'), JSON.stringify({ name: consumer.name, private: true, type: 'module' }, null, 2));

    for (const [file, contents] of Object.entries(consumer.files)) writeFileSync(join(dir, file), contents);

    const needsTypeScript = consumer.name.startsWith('ts-');

    try {
      run('npm', ['install', '--no-audit', '--no-fund', '--silent', tarball, ...(needsTypeScript ? ['typescript', '@types/node'] : [])], dir);

      const [command, args] = consumer.verify(dir);

      run(command, args, dir);
      console.log(`✅ ${consumer.name}`);
    } catch (error) {
      failures += 1;
      const details = error as { stdout?: string; stderr?: string; message: string };
      console.error(`❌ ${consumer.name}\n${details.stdout || ''}${details.stderr || details.message}`);
    }
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}

if (failures) {
  console.error(`\n${failures} consumer check(s) failed — the published package would be broken for them.`);
  process.exit(1);
}

console.log('\nAll consumers can install and use the packed package.');
