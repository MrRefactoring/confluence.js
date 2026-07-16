/**
 * Global setup for the live cloud suite.
 *
 * Spaces are the heaviest resource the suites create, and Confluence deletes are
 * async — a crashed run can leave a `[cfjs:…]` space behind. This sweep deletes
 * every leftover marker-tagged space once before the run and once after, so the
 * site never accumulates test debris regardless of how a run ends. Per-suite
 * teardown (via ResourceTracker) still does the bulk of cleanup; this is the net.
 */
import { config } from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { RESOURCE_MARKER } from '../helpers/naming';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DELETE_ATTEMPTS = 3;

interface V1Space {
  key: string;
  name?: string;
}

interface V1SpaceList {
  results?: V1Space[];
  _links?: { next?: string };
}

function auth(email: string, apiToken: string): string {
  return `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`;
}

async function purgeLeftoverSpaces(host: string, email: string, apiToken: string): Promise<void> {
  const headers = { Authorization: auth(email, apiToken), Accept: 'application/json' };
  const leftovers: string[] = [];

  // Page through every space; collect those whose name carries our run marker.
  let url: string | undefined = `${host}/wiki/rest/api/space?limit=100`;

  while (url) {
    const response = await fetch(url, { headers });

    if (!response.ok) return;

    const page = (await response.json()) as V1SpaceList;

    for (const space of page.results ?? []) {
      if (space.name?.includes(`${RESOURCE_MARKER}:`) || space.key.startsWith('CFJS')) {
        leftovers.push(space.key);
      }
    }

    url = page._links?.next ? `${host}/wiki${page._links.next}` : undefined;
  }

  for (const key of leftovers) {
    for (let attempt = 0; attempt < DELETE_ATTEMPTS; attempt++) {
      const deletion = await fetch(`${host}/wiki/rest/api/space/${key}`, { method: 'DELETE', headers });

      if (deletion.ok || deletion.status === 404) break;

      if (attempt < DELETE_ATTEMPTS - 1) {
        await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
      }
    }
  }
}

export default async function globalSetup(): Promise<() => Promise<void>> {
  config({ path: resolve(__dirname, '../../../../../.env'), override: false });

  const host = process.env.HOST?.replace(/\/+$/, '');
  const email = process.env.EMAIL;
  const apiToken = process.env.API_TOKEN;

  if (!host || !email || !apiToken) return async () => {};

  await purgeLeftoverSpaces(host, email, apiToken);

  return async () => {
    await purgeLeftoverSpaces(host, email, apiToken);
  };
}
