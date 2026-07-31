---
'confluence.js': minor
---

`getRestrictionsByOperation` returns a typed result instead of `unknown`.

The v1 endpoint generated as `Promise<unknown>`, so its payload reached callers untyped and unvalidated. It now
resolves to a `GetRestrictionsByOperation` and is validated like every other endpoint's response.

The published spec describes this endpoint incorrectly — an open map whose values wrap a restriction in an
`operationType`/`_links` envelope. No such envelope exists: Confluence answers with the restriction itself under each
operation name it restricts, `read` and `update`, alongside a sibling `_links` for the response as a whole. The model
describes what the endpoint actually returns, so `read` and `update` are typed `ContentRestriction` and nothing is
left undescribed.

Callers that treated the result as `unknown` and narrowed it themselves keep working. Code that relied on the absence
of validation may now surface a `SchemaMismatchError` where the response does not match the model.
