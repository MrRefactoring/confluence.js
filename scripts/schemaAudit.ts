/**
 * Runs the schema audit and reports what the live API sends that the schemas do not describe.
 *
 * Two things can go wrong and they are not the same thing:
 *
 * - a test fails, which means the library is actually broken against the live API;
 * - drift is found, which means Atlassian's spec has fallen behind its own API.
 *
 * Both fail the run, but the summary keeps them apart — a red run for the second reason is a documentation debt, not
 * an outage, and reading it as one wastes the signal.
 *
 * Runs on bare `node` — keep the types here erasable, as in scripts/checkBrowserSafe.ts.
 */
import { spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const findings = join(root, 'node_modules', '.cache', 'schema-audit.jsonl');

interface UndocumentedKeys {
  kind?: 'keys';
  endpoint: string;
  path: string;
  keys: string[];
  types: Record<string, string>;
}

interface UndocumentedValue {
  kind: 'value';
  endpoint: string;
  path: string;
  value: string;
  documented: string[];
}

type SchemaDrift = UndocumentedKeys | UndocumentedValue;

// `--report-only` rebuilds the summary from the last run's findings. The suite takes
// several minutes against a live site, and reformatting the report should not cost that.
const reportOnly = process.argv.includes('--report-only');

mkdirSync(dirname(findings), { recursive: true });

if (!reportOnly) rmSync(findings, { force: true });

const run = reportOnly
  ? { status: 0 }
  : spawnSync('npx', ['vitest', 'run', '--config', 'vitest.config.audit.ts'], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, AUDIT_SCHEMAS_OUTPUT: findings },
  });

/**
 * Array indices carry no information here.
 *
 * `results.0._links.self` and `results.1._links.self` are one gap in one schema, and left as they are they would fill
 * the report with the same finding once per element the API happened to return.
 */
function normalize(path: string): string {
  return path.replace(/(^|\.)\d+(\.|$)/g, '$1[]$2');
}

/**
 * Collapses the resource ids the suite happened to create.
 *
 * Without this the report names `GET /wiki/api/v2/attachments/att17105305` — an id that existed for the length of one
 * run — and counts every such URL as its own endpoint, so the same gap in one route reads as dozens.
 *
 * The digit run has to be long: `v2` and `api` are route, not identity.
 */
function normalizeEndpoint(endpoint: string): string {
  return endpoint
    .split('/')
    .map(segment => {
      if (/^\d{4,}$/.test(segment)) return '{id}';
      if (/^[a-zA-Z]+\d{4,}$/.test(segment)) return '{id}';
      if (/^[0-9a-f]{16,}$/i.test(segment)) return '{id}';

      return segment;
    })
    .join('/');
}

const byField = new Map<string, Set<string>>();
const typesByField = new Map<string, Set<string>>();
const valuesByField = new Map<string, Set<string>>();
const documentedByField = new Map<string, Set<string>>();
const endpointsByField = new Map<string, Set<string>>();

function add(index: Map<string, Set<string>>, field: string, value: string): void {
  if (!index.has(field)) index.set(field, new Set());

  index.get(field)!.add(value);
}

if (existsSync(findings)) {
  const lines = readFileSync(findings, 'utf8').trim();

  for (const line of lines ? lines.split('\n') : []) {
    const entry = JSON.parse(line) as SchemaDrift;
    const endpoint = normalizeEndpoint(entry.endpoint);

    if (entry.kind === 'value') {
      const field = normalize(entry.path);

      add(valuesByField, field, entry.value);
      add(endpointsByField, field, endpoint);

      for (const documented of entry.documented) add(documentedByField, field, documented);

      continue;
    }

    for (const key of entry.keys) {
      const field = normalize(entry.path ? `${entry.path}.${key}` : key);

      add(byField, field, endpoint);
      add(typesByField, field, entry.types?.[key] ?? 'unknown');
    }
  }
}

const ranked = [...byField.entries()].sort(
  (a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]),
);
const rankedValues = [...valuesByField.entries()].sort(
  (a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]),
);
const endpoints = new Set(
  [...byField.values(), ...endpointsByField.values()].flatMap(set => [...set]),
);

/** `a`, `b`, `c` — at most three, then a count, so one loud finding cannot push the table off the page. */
function sample(values: Set<string>, separator = '<br>'): string {
  const shown = [...values].sort().slice(0, 3).join(separator);

  return values.size > 3 ? `${shown}${separator}…and ${values.size - 3} more` : shown;
}

const summary: string[] = ['## Schema audit', ''];

if (ranked.length === 0 && rankedValues.length === 0) {
  summary.push('No drift: every response matched the schema that describes it.');
}

if (ranked.length > 0) {
  summary.push(
    `**${ranked.length} undocumented fields** across **${endpoints.size} endpoints**.`,
    '',
    'These are keys Confluence sends that the schemas do not describe. Usually not breakage —',
    'the published spec has fallen behind the API — but each one is a field consumers cannot see',
    'in the types.',
    '',
    '| Field | Type | Endpoints | Seen at |',
    '| --- | --- | ---: | --- |',
  );

  for (const [field, seen] of ranked) {
    const types = [...(typesByField.get(field) ?? new Set(['unknown']))].sort().join(' | ');

    summary.push(`| \`${field}\` | \`${types}\` | ${seen.size} | ${sample(seen)} |`);
  }

  summary.push('');
}

if (rankedValues.length > 0) {
  summary.push(
    `**${rankedValues.length} enums have grown** past the values their schema lists.`,
    '',
    'The field is described, its set of values is not complete. Callers are unaffected — these',
    'schemas accept any string outside the audit — but the documented values are what an editor',
    'suggests, so each one is a value nobody will discover from the types.',
    '',
    '| Field | Sent | Documented | Seen at |',
    '| --- | --- | --- | --- |',
  );

  for (const [field, sent] of rankedValues) {
    const documented = documentedByField.get(field) ?? new Set<string>();
    const seen = endpointsByField.get(field) ?? new Set<string>();

    summary.push(
      `| \`${field}\` | \`${sample(sent, '`, `')}\` | \`${sample(documented, '`, `')}\` | ${sample(seen)} |`,
    );
  }
}

const report = `${summary.join('\n')}\n`;

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, report, 'utf8');
} else {
  console.log(`\n${report}`);
}

if (run.status !== 0) {
  console.error('\nThe audit suite itself failed — that is real breakage, not drift. See the run output above.');
  process.exit(run.status ?? 1);
}

if (ranked.length > 0 || rankedValues.length > 0) {
  console.error(
    `\nSchema audit: ${ranked.length} undocumented fields, ${rankedValues.length} grown enums, across ${endpoints.size} endpoints.`,
  );
  process.exit(1);
}

console.log('\nSchema audit: no drift.');
