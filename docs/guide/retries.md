---
title: Retries
description: confluence.js retries transport faults only, opt-in. Why 429 and other 4xx are never retried, and how to handle rate limits yourself.
---

# Retries

Off by default. When you turn them on, they cover **transport faults only**:

```ts
const confluence = createV2Client({
  host,
  auth,
  retry: { maxAttempts: 3, initialDelayMs: 500, backoffFactor: 2 },
});
```

| Option | Default | Meaning |
|---|---|---|
| `maxAttempts` | `1` | total attempts, first included — `1` means no retry |
| `initialDelayMs` | `500` | delay before the first retry |
| `backoffFactor` | `2` | multiplier per attempt |

With the settings above: try, wait 500 ms, try, wait 1000 ms, try, give up.

## What is retried

Only failures that carry no information about your request:

- **Network errors** — `ECONNRESET`, `ETIMEDOUT`, `ENOTFOUND`, `EAI_AGAIN`, `EPIPE`, `UND_ERR_SOCKET`, `ERR_SSL_*`
- **HTTP 502, 503, 504** — a proxy or an overloaded server, not an answer

## What is never retried

**Every 4xx, including 429.** Rate limiting is a signal to slow down, not a transient fault to paper over: retrying a 429 on a timer spends your budget faster and hides the fact that you are over it. Handle it deliberately:

```ts
import { isRateLimitError } from 'confluence.js';

try {
  await confluence.page.createPage({ body: page });
} catch (error) {
  if (isRateLimitError(error)) {
    // Atlassian's own advice, already parsed out of Retry-After.
    await enqueueAfter(error.retryAfterMs ?? 60_000);

    return;
  }

  throw error;
}
```

**5xx other than 502/503/504** is not retried either. A `500` from Confluence means the server took your request and choked on it — sending it again usually reproduces the same failure, and masking it would hide a real bug (in the API, or in what you sent).

## `withRetry` — the same policy, per call

When you want retries around one call rather than the whole client, `withRetry` wraps it:

```ts
import { withRetry } from 'confluence.js/core';

const page = await withRetry(() => confluence.page.getPageById({ id: 12345 }), {
  maxAttempts: 4,
  initialDelayMs: 500,
  backoffFactor: 2,
});
```

It applies **exactly the policy above** — transient transport failures and 502/503/504 — so wrapping a call never changes which failures count as temporary. 401, 403, 404 and 500 are rethrown on the first attempt.

To let one call ride out a rate limit, opt in:

```ts
await withRetry(() => confluence.page.createPage({ body: page }), {
  maxAttempts: 3,
  retryRateLimit: true, // waits out Retry-After when Confluence sent one
});
```

::: warning It is not a poller
`withRetry` only reacts to those failures. A plain `throw` inside the operation is not retried, so it cannot wait on eventually-consistent state:

```ts
// ❌ runs exactly once — the thrown Error is not a retryable failure
await withRetry(async () => {
  const hits = await confluence.search.searchByCQL({ cql: `id=${pageId}` });
  if (!hits.results.length) throw new Error('not indexed yet');
  return hits.results[0];
});
```

Loop on the value instead:

```ts
// ✅
async function waitForIndex(pageId: string, attempts = 6) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const hits = await confluence.search.searchByCQL({ cql: `id=${pageId}` });

    if (hits.results.length > 0) return hits.results[0];

    await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
  }

  return undefined;
}
```
:::

## Eventual consistency is not an error

Confluence is not read-your-write everywhere: a page takes a moment to appear in a listing, and search indexing can lag by minutes on a busy site. Nothing fails — the answer is just not there yet, so there is no error to retry on. Poll the read, as above.

Never retry the *write*. A create that "failed" may well have succeeded, and a second attempt gives you two pages.
