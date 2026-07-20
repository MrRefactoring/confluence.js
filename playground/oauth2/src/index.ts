/**
 * The whole OAuth 2.0 (3LO) flow against a real Confluence, end to end.
 *
 * Consent in the browser, tokens, cloud id, then one client driving both API versions — and a refresh you can watch
 * happen. Runs on bare `node`: the types here are erasable, so there is no build step.
 */
import { exec } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import {
  createV1Client,
  createV2Client,
  exchangeAuthorizationCode,
  generateAuthorizationUrl,
  getAccessibleResources,
  isReauthorizationRequired,
  isScopeError,
  parseCallbackUrl,
} from 'confluence.js';
import { createClient } from 'confluence.js/core';
import { config } from './config.ts';

const redirectUri = `http://localhost:${config.port}/callback`;
const CONSENT_TIMEOUT_MS = 5 * 60 * 1000;

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** The error text comes from Atlassian, so it is escaped before being put into a page. */
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, char => ESCAPES[char]);
}

function openBrowser(url: string): void {
  const opener = { darwin: 'open', win32: 'start ""' }[process.platform as string] ?? 'xdg-open';

  exec(`${opener} "${url}"`, error => {
    if (error) console.log('   (could not open a browser — follow the link above yourself)');
  });
}

function page(title: string, detail: string): string {
  return `<!doctype html><meta charset="utf-8"><title>${title}</title>
    <body style="font:16px/1.5 system-ui;margin:4rem auto;max-width:34rem">
    <h1 style="font-size:1.2rem">${title}</h1><p>${detail}</p></body>`;
}

/** Serve the callback once, hand back the code, and tell the user what happened either way. */
function awaitConsent(expectedState: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const server = createServer((request, response) => {
      if (!request.url?.startsWith('/callback')) {
        response.writeHead(404).end();

        return;
      }

      const finish = (status: number, html: string) => {
        response.writeHead(status, { 'content-type': 'text/html; charset=utf-8' });
        response.end(html);
        clearTimeout(timer);
        server.close();
      };

      try {
        // Checks `state` in constant time, turns a declined consent screen into a
        // typed error, and rejects a URL that is not a callback at all. Doing this
        // by hand is where the subtle mistakes live.
        const { code } = parseCallbackUrl(request.url, { expectedState });

        finish(200, page('Authorized', 'You can close this tab and return to the terminal.'));
        resolve(code);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        finish(400, page('Authorization failed', escapeHtml(message)));
        reject(error);
      }
    });

    const timer = setTimeout(() => {
      server.close();
      reject(new Error(`Nobody completed consent within ${CONSENT_TIMEOUT_MS / 60_000} minutes.`));
    }, CONSENT_TIMEOUT_MS);

    server.listen(config.port);
  });
}

const state = randomUUID();

console.log('\n1. Consent');

const authorizationUrl = generateAuthorizationUrl({
  clientId: config.clientId,
  scopes: config.scopes,
  redirectUri,
  state,
});

console.log(`   ${authorizationUrl}\n`);
openBrowser(authorizationUrl);

const code = await awaitConsent(state);

console.log('   consent granted\n2. Exchanging the code for tokens');

const tokens = await exchangeAuthorizationCode({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  code,
  redirectUri,
});

if (!tokens.refreshToken) {
  console.log('   no refresh token — `offline_access` was not among the requested scopes');
}

console.log(`   access token expires in ${tokens.expiresIn}s`);

const sites = await getAccessibleResources(tokens.accessToken);

console.log(`3. Sites this grant reaches: ${sites.map(site => `${site.name} (${site.id})`).join(', ') || 'none'}`);

let refreshes = 0;

// One client, shared by both version factories. Building one per factory would
// give each its own token — and since Atlassian rotates the refresh token on
// every refresh, the first refresh would silently invalidate the other's.
const client = createClient({
  auth: {
    type: 'oauth2',
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: tokens.refreshToken,
    accessToken: tokens.accessToken,
    // Deliberately marked already expired. The token we just received is
    // perfectly good for an hour, and waiting that long to watch a refresh is no
    // way to learn what it does — so the client is told it is stale and renews
    // before the first call. Everything after this runs on the refreshed token.
    expiresAt: Date.now() - 1,
    onTokenRefresh: ({ expiresAt }) => {
      refreshes += 1;
      console.log(`   ↻ token refreshed (#${refreshes}), next expiry ${new Date(expiresAt).toISOString()}`);
      // A real app persists the new refresh token here. Losing it means the user
      // has to authorize again.
    },
  },
});

const v2 = createV2Client(client);
const v1 = createV1Client(client);

console.log('4. Driving both API versions through the one client');
console.log('   (the token was marked stale, so the first call refreshes it)');

try {
  const pages = await v2.page.getPages({ limit: 3 });

  console.log(`   v2 → ${pages.results?.length ?? 0} page(s)`);

  const [page] = pages.results ?? [];

  if (page) {
    // Same token, same client, the other API version. Scopes are per endpoint
    // rather than per version, so what matters is holding the one this operation
    // names — here a classic scope, alongside the granular ones v2 needs.
    const restrictions = await v1.contentRestrictions.getRestrictions({ id: page.id });

    console.log(`   v1 → ${restrictions.results?.length ?? 0} restriction(s) on page ${page.id}`);
  }
} catch (error) {
  if (isScopeError(error)) {
    console.log(`   ScopeError: ${error.message.split('\n')[0]}`);
    console.log('   Add the scope the failing operation names, then authorize again.');
  } else if (isReauthorizationRequired(error)) {
    console.log('   the grant is dead — the user has to authorize again');
  } else {
    throw error;
  }
}

console.log(`\n5. ${refreshes} refresh(es) happened. Each one invalidated the previous refresh token:`);
console.log('   persist the new one in onTokenRefresh, or the next run starts from consent again.\n');
