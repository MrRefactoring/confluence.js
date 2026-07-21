---
'confluence.js': patch
---

Restore the npm provenance attestation.

3.0.2 was published without one: the release switched to `changeset publish`, which delegates to pnpm's native publish,
and pnpm reads the provenance flag from `.npmrc` rather than the `NPM_CONFIG_PROVENANCE` env var the workflow was
setting. This release turns provenance on in `.npmrc`, so the published package is signed again — the same SLSA
attestation 3.0.1 carried. No code changes; the package contents are identical to 3.0.2.
