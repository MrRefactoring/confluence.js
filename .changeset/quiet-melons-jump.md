---
'confluence.js': patch
---

Describe the last fields the schema audit found undocumented.

Closes the tail left after the previous release: `comment` and `attachment` on a version returned inside a
`versions` collection, the `count` on a like collection's meta, the hyphenated `inline-marker-ref` /
`inline-original-selection` inline-comment property keys, the async content-body's `content`, and `noAccessEmails` on
the check-access-by-email response. The schema audit now reports no drift at all.

As before, every addition is optional and additive: nothing that used to type-check stops doing so, runtime validation
is unchanged, and no field is renamed or removed — the types simply describe more of what Confluence already returns.
