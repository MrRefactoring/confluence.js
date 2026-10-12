---
"confluence.js": patch
---

Allow optional `minorEdit` and UTF-8 `comment` values on each attachment in v1 uploads, upserts, and data updates. Preserve positional alignment in multi-file requests by filling missing comments with empty strings and missing minor-edit flags with `false` only when that field is supplied by another attachment.
