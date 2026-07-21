---
'confluence.js': patch
---

Types now describe the fields Confluence returns that its own spec never documented.

The schema audit shipped in the previous release found 161 undocumented fields across 93 endpoints — keys the API sends
at runtime that the published types hid. This release adds 154 of them into the types; the remaining 7 sit behind
inline or collection schemas and are tracked separately.

Every addition is optional and additive. Nothing that used to type-check stops doing so, runtime validation is
unchanged, and no field is renamed or removed — consumers simply gain access in the types to values they were already
receiving: `_links` keys on every entity, the `Container` and `Version` fields, user `accountStatus`/`locale`, comment
`resolutionStatus`, and more.
