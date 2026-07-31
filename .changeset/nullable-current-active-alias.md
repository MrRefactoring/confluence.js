---
'confluence.js': patch
---

`currentActiveAlias` is nullable, as the API returns it.

The v2 spec declares the field as a plain string on both the space entity and its collection representation, but
Confluence answers with `null` for any space that has no alias. Strict response validation rejected that, so
`getSpaces` threw a `SchemaMismatchError` on the first aliasless space in the page, and `getSpaceById` would have
done the same. The field is now `string | null | undefined` on `Space` and `SpaceSummary`.

Existing code is unaffected: the field was already optional, so any narrowing that handled `undefined` handles
`null` too.
