---
"confluence.js": patch
---

Accept space responses with an unavailable `homepageId` returned as `null`. Normalize it to `undefined` while preserving the existing optional string type and rejecting invalid homepage ID values.
