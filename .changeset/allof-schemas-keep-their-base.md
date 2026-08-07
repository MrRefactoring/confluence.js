---
'confluence.js': minor
---

Two schemas built from an `allOf` no longer come out empty.

`LookAndFeelWithLinks` and `ContentBlogpost` are each declared as a `$ref` to a base plus an inline extension. The
generator kept neither side and emitted an object with no properties, so `updateLookAndFeelSettings` returned `{}` —
every field the endpoint answers with was there at runtime, since response objects are loose, but none of it was
typed, and none of it was validated.

Both now carry their base's fields alongside their own. `updateLookAndFeelSettings` returns the look-and-feel shape
it always sent, `_links` included.
