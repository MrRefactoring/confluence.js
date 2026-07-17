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

### Breaking changes

- `new ConfluenceClient({…})` → `createV1Client({…})` / `createV2Client({…})`
- `authentication: { basic: {…} }` → `auth: { type: 'basic', … }`; `oauth2` → `auth: { type: 'bearer', token }`
- JWT (Atlassian Connect) authentication is not supported — Connect apps should stay on `confluence.js@2`
- Callbacks, `middlewares`, `apiPrefix` and `baseRequestConfig` are removed
- `noCheckAtlassianToken` is removed with nothing to replace it: v1 enforces XSRF
  on every write, so every v1 write now sends `X-Atlassian-Token: no-check` itself
- `BaseClient` and the per-namespace classes are gone, as are deep imports like `confluence.js/api/content`
- Errors are `ApiError` (`status`, `statusText`, `body`) rather than `AxiosError`
- The v1 surface follows Atlassian's current spec, which has dropped 37 operations
  (`getContent`, `createContent`, `getSpace`, …) since 2.x shipped — each is mapped
  to its v2 equivalent in the migration guide

See [MIGRATION.md](https://github.com/MrRefactoring/confluence.js/blob/master/MIGRATION.md);
a codemod handles the mechanical parts.
