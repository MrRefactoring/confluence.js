---
title: Search (CQL)
description: Search Confluence with CQL through confluence.js — searchByCQL vs searchContentByCQL, paging with cursors, and why fresh content takes a moment to appear.
---

# Search (CQL)

CQL — the Confluence Query Language — is **v1-only**. v2 has no query language at all, so this is one of the endpoints v1 exists for.

```ts
import { createV1Client } from 'confluence.js';

const confluence = createV1Client({ host, auth });
```

## Two endpoints, two answers

They look interchangeable and are not:

```ts
// Search hits: an envelope with entityType, excerpt, score — and the content inside.
const hits = await confluence.search.searchByCQL({ cql: 'type=page', limit: 25 });

for (const hit of hits.results) {
  console.log(hit.entityType, hit.content?.title, hit.excerpt);
}

// Content search: the content objects themselves, no envelope.
const contents = await confluence.content.searchContentByCQL({ cql: 'type=page', limit: 25 });

for (const content of contents.results) {
  console.log(content.type, content.title, content.status);
}
```

Use `searchByCQL` when you want search metadata — relevance, excerpts, what kind of thing matched. Use `searchContentByCQL` when you just want the content and would otherwise unwrap every hit.

## Queries worth stealing

```ts
// Everything in a space
{ cql: 'space="DOCS"' }

// Pages with a label
{ cql: 'type=page and label="release-notes"' }

// Recently changed, newest first
{ cql: 'lastModified > now("-7d") order by lastModified desc' }

// Text search scoped to a space
{ cql: 'space="DOCS" and text ~ "deployment"' }

// A specific page
{ cql: 'id=12345' }

// Everything a person created
{ cql: 'creator = "5b6d7f20e6dba529eefdbad9"' }
```

Atlassian documents the full grammar in [Advanced Searching using CQL](https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/).

## Malformed CQL is an error, not an empty result

```ts
import { ApiError } from 'confluence.js';

try {
  await confluence.search.searchByCQL({ cql: 'this is not cql' });
} catch (error) {
  if (error instanceof ApiError && error.status === 400) {
    // The query did not parse — worth surfacing, not swallowing.
  }
}
```

Worth relying on: a typo in a query fails loudly rather than quietly returning nothing.

## Paging

`searchByCQL` pages with `start`/`limit`, and reports the full match count separately from the page size:

```ts
const page = await confluence.search.searchByCQL({ cql: 'type=page', limit: 25, start: 0 });

console.log(page.results.length); // ≤ 25
console.log(page.totalSize);      // every match, not just this page
```

`searchContentByCQL` uses a cursor instead:

```ts
let cursor: string | undefined;

do {
  const page = await confluence.content.searchContentByCQL({ cql: 'type=page', limit: 50, cursor });

  for (const content of page.results) handle(content);

  cursor = page._links?.next ? new URL(page._links.next, host).searchParams.get('cursor') ?? undefined : undefined;
} while (cursor);
```

## Users

```ts
const users = await confluence.search.searchUser({ cql: 'user.fullname ~ "Alex"' });
```

Note the separate grammar: user search has its own CQL fields.

## Fresh content is not instant

Search reads an index, and the index lags writes — usually seconds, but minutes on a busy site. A page you just created is genuinely not findable yet, and that is not an error: the call succeeds and returns nothing. So poll the *value*, not an exception:

```ts
async function waitForIndex(pageId: string, attempts = 6) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const hits = await confluence.search.searchByCQL({ cql: `id=${pageId}` });

    if (hits.results.length > 0) return hits.results[0];

    await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
  }

  return undefined;
}
```

`withRetry` from `confluence.js/core` will **not** help here — it only reacts to a 429/502/503/504 `ApiError`, and an empty result is neither.

If you need read-your-write, do not use search at all: `v2.page.getPageById` is consistent the moment the write returns.
