---
'confluence.js': major
---

**confluence.js 3.0 — both Confluence Cloud APIs from one package.**

The library now covers Cloud REST **v2** (30 namespaces, 218 methods) alongside
**v1** (28 namespaces, 130 methods). Both are first-class: Atlassian has not
deprecated v1, and the two cover different ground. One `host` and one client
serve both — the API path belongs to the request, not to your config.

Runtime dependencies are down to `zod` alone. axios, form-data, oauth and
atlassian-jwt are gone with the old transport, which is now the built-in `fetch`.
Every response is validated against a Zod 4 schema, so API drift raises a
`ZodError` instead of surfacing as `undefined` later on.

```ts
import { createV2Client } from 'confluence.js';

const confluence = createV2Client({
  host: 'https://your-domain.atlassian.net',
  auth: { type: 'basic', email, apiToken },
});

await confluence.page.getPages({ spaceId: ['123'] });
```

Or import just what you call — the package is ESM-only and tree-shakable, with
entry points at `confluence.js/v1`, `confluence.js/v2` and `confluence.js/core`.

**OAuth 2.0 (3LO)** is a first-class strategy. Hand over your app credentials and
a refresh token, and the client refreshes before expiry, retries once on a `401`,
resolves the cloud id, and routes through the Atlassian gateway — where 3LO tokens
are actually accepted:

```ts
const confluence = createV2Client({
  auth: {
    type: 'oauth2',
    clientId,
    clientSecret,
    refreshToken,
    onTokenRefresh: ({ refreshToken }) => tokenStore.save(refreshToken),
  },
});
```

The flow itself is covered too, so no separate OAuth library is needed:
`generateAuthorizationUrl`, `parseCallbackUrl`, `exchangeAuthorizationCode`,
`refreshOAuth2Token` and `getAccessibleResources`.

Both version factories accept an existing client, so v1 and v2 can share one
OAuth token — building one each would make the first refresh invalidate the
other's rotating refresh token:

```ts
const client = createClient({ auth: { type: 'oauth2', … } });

const v1 = createV1Client(client);
const v2 = createV2Client(client);
```

**Node and the browser, from one build.** There is no separate web build: the code
branches on what the runtime supports rather than on which runtime it is. It loads
from a dependency-resolving CDN as published, and a self-contained `dist/browser.js`
with zod inlined covers plain file hosts and `<script type="module">`:

```html
<script type="module">
  import { createV2Client } from 'https://esm.sh/confluence.js';
</script>
```

Attachments accept the same values everywhere — a `File`, `Blob`, `Uint8Array`,
string, stream, and still Node's `Buffer` and `Readable`, which are a `Uint8Array`
and an `AsyncIterable` respectively. They are no longer *named* in `AttachmentContent`,
so the shipped declarations compile in a project without `@types/node`. Where a
browser cannot send a request body as a stream, the stream is read into a `Blob`
rather than failing. See the [browser guide](https://mrrefactoring.github.io/confluence.js/guide/browser).

**Every failure has a type.** Non-2xx responses throw an `ApiError` subclass —
`AuthError`, `ForbiddenError`, `NotFoundError`, `RateLimitError` (with
`retryAfterMs` parsed from `Retry-After`), `ServerError`. Transport faults throw
`NetworkError` instead of leaking a raw `fetch` `TypeError`, and OAuth failures
throw `OAuthError`. Each ships an `isXxx` predicate that checks a branded marker
rather than the prototype chain, so narrowing survives two copies of the package
in one `node_modules`:

```ts
import { isNotFoundError, isRateLimitError } from 'confluence.js';

if (isNotFoundError(error)) return null;
if (isRateLimitError(error)) await sleep(error.retryAfterMs ?? 60_000);
```

### Breaking changes

- `new ConfluenceClient({…})` → `createV1Client({…})` / `createV2Client({…})`
- `authentication: { basic: {…} }` → `auth: { type: 'basic', … }`; `oauth2` → `auth: { type: 'oauth2', … }`
- JWT (Atlassian Connect) authentication is not supported — Connect apps should stay on `confluence.js@2`
- Callbacks, `middlewares`, `apiPrefix` and `baseRequestConfig` are removed
- `noCheckAtlassianToken` is removed with nothing to replace it: v1 enforces XSRF
  on every write, so every v1 write now sends `X-Atlassian-Token: no-check` itself
- `BaseClient` and the per-namespace classes are gone, as are deep imports like `confluence.js/api/content`
- Errors are `ApiError` and its subclasses (`status`, `statusText`, `body`) rather
  than `AxiosError`; transport faults are `NetworkError`, OAuth failures are `OAuthError`
- `AttachmentContent` no longer names `Buffer` or `Readable`. Both still work — the
  type describes them structurally — but a declaration that required `@types/node`
  broke every browser consumer
- `createMultipartRequestBody` returns a `Promise`: collecting a stream for a runtime
  that cannot send one is asynchronous
- The v1 surface follows Atlassian's current spec, which has dropped 37 operations
  (`getContent`, `createContent`, `getSpace`, …) since 2.x shipped — each is mapped
  to its v2 equivalent in the migration guide

See [MIGRATION.md](https://github.com/MrRefactoring/confluence.js/blob/master/MIGRATION.md);
a codemod handles the mechanical parts.
