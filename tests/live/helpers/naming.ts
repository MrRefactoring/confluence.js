/**
 * Run-scoped unique names for live-test resources.
 *
 * Every name carries a per-process `RUN_ID` so concurrent or repeated runs never
 * collide, and a shared `cfjs` marker so the global-setup purge can recognize and
 * sweep anything a crashed run left behind.
 */
const RUN_ID = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`;

/** Marker embedded in every resource name/key created by the live suite. */
export const RESOURCE_MARKER = 'cfjs';

/** Stable id for the current test process. */
export function runId(): string {
  return RUN_ID;
}

/** Human-readable, run-scoped resource name, e.g. `[cfjs:abc123] my-page`. */
export function testName(label: string): string {
  return `[${RESOURCE_MARKER}:${RUN_ID}] ${label}`;
}

/**
 * A valid, unique Confluence space key: uppercase alphanumeric, starts with a
 * letter, well under the 255-char limit. `label` disambiguates keys created
 * within the same run (e.g. a suite that needs two spaces).
 */
export function spaceKey(label = ''): string {
  const suffix = `${RUN_ID}${label}`.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

  return `CFJS${suffix}`.slice(0, 50);
}
