---
'confluence.js': patch
---

Adds a schema audit that reports the keys Confluence sends but the schemas do not describe.

Nothing changes for callers. Response validation stays loose, so undocumented fields keep passing through untouched,
and the published types are byte-identical. The audit is off unless `AUDIT_SCHEMAS=true` is set, which only this
package's own nightly run does; `src/core/schemaAudit.ts` is internal and is not exported.

The first run found 161 undocumented fields across 93 endpoints — Atlassian's published spec having fallen behind its
own API rather than anything broken. Each one is a field consumers receive at runtime but cannot see in the types, and
fixing them is what makes the types truer.
