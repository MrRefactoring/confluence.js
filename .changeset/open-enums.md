---
'confluence.js': minor
---

A value Atlassian has not written down no longer rejects the response.

Every documented set of string values — 314 of them across v1 and v2 — was a closed `z.enum`, so the first time
Confluence answered with a status, sort order or content type its own specification did not list, strict validation
threw a `SchemaMismatchError`. Nothing was wrong with the response and nothing the caller could do would help: the
published spec routinely falls behind the API it describes.

Those fields now accept any string. The documented values survive where they are useful — `Space['status']` is
`'current' | 'archived' | (string & {})`, so an editor still suggests both while the compiler accepts whatever the
API turns out to send — and the failure message names them.

Existing code is unaffected at runtime and keeps its autocompletion. A value read out of one of these fields is now
assignable to `string` rather than only to the listed literals, so an exhaustive `switch` over one needs a default
branch it should arguably have had anyway.
