---
title: Browsers
description: Run confluence.js in a browser — importing from a CDN, what attachments do differently there, and why calling Confluence straight from a page is usually the wrong shape.
---

# Browsers

The package runs unchanged in a browser. There is one build, not a Node build and a web build: the code branches on what the runtime can do rather than on which runtime it is.

## Read this before you ship it

Calling Confluence directly from a page means the browser holds a credential.

An API token in front-end code is readable by anyone who opens devtools, and it carries the full rights of the account that issued it. An OAuth 2.0 client secret is worse, because it also lets someone mint tokens. Neither belongs in a bundle.

Confluence Cloud also does not send CORS headers for third-party origins, so a request from your own domain is refused by the browser before it reaches Atlassian.

That leaves two shapes that actually work:

- **A server in front.** Your page talks to your backend, the backend holds the credential and talks to Confluence. This is the right answer for almost every product.
- **A first-party surface.** A Forge or Connect app, or an extension, where the platform supplies the origin and the credential.

Browser support exists so those surfaces — and tooling, sandboxes, docs pages and tests — can use the same library. It is not an invitation to put a token in a web page.

## Importing from a CDN

Any CDN that resolves dependencies serves the package as it is published:

```html
<script type="module">
  import { createV2Client } from 'https://esm.sh/confluence.js';
</script>
```

jsDelivr works the same way through its `+esm` endpoint:

```js
import { createV2Client } from 'https://cdn.jsdelivr.net/npm/confluence.js/+esm';
```

The published entry imports `zod` by bare specifier, which a browser cannot resolve on its own — those CDNs rewrite it before serving. A host that returns files untouched will fail on that import.

For those, and for a plain `<script type="module">` with no resolver at all, there is a self-contained build with zod already inlined:

```js
import { createV2Client } from 'https://cdn.jsdelivr.net/npm/confluence.js/dist/browser.js';
```

It is a single file of about 45 kB gzipped. Prefer one of the entries above when you can: they leave your bundler free to share one copy of zod and to drop the parts of the library you never call.

## Attachments

Content that is already in memory — a `File` from an `<input>`, a `Blob`, a `Uint8Array`, a string — goes out as `FormData`. The browser streams a `File` off disk itself, so a large upload does not sit in memory:

```ts
const [file] = input.files;

await confluence.contentAttachments.createAttachment({
  id: pageId,
  attachments: { filename: file.name, content: file },
});
```

Handing the library a `ReadableStream` is where behaviour differs. Sending a request body as a stream is [not baseline](https://developer.mozilla.org/en-US/docs/Web/API/Request/duplex): Chromium supports it over HTTP/2, Firefox and Safari do not support it at all. So:

- where streaming works, the stream is sent as a stream;
- where it does not, the stream is read into a `Blob` first and sent that way.

The fallback costs memory, which is why it is a fallback rather than the default. If a proxy downgrades the connection to HTTP/1.1, Chromium rejects the upload — and by then the stream has been partly read, so the library cannot silently retry it. The failure surfaces; pass a `Blob` if you hit it.

Node's own types still work everywhere. `Buffer` is a `Uint8Array` and a `Readable` is an `AsyncIterable`, so both are accepted — they simply are not named in the type, which is what lets the declarations compile in a project without `@types/node`.

## What is checked

Two things run in CI on every change:

- the built package is scanned for anything Node-only — a `node:` import, a `process` or `Buffer` reference, or a Node type leaking into the shipped declarations, which would break `tsc` for browser consumers;
- the built package is loaded in headless Chromium, in both shipping shapes, and made to perform a request, an attachment upload, and a failing call whose error is narrowed with a predicate.

## Narrowing errors across bundles

Use the [predicates](./error-handling), not `instanceof`. They read a branded symbol rather than the prototype chain, so they keep working when a bundler splits chunks, when minification renames classes, and when two copies of the package end up in one page:

```ts
import { isNotFoundError } from 'confluence.js';

if (isNotFoundError(error)) return null;
```
