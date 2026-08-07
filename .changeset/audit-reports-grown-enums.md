---
'confluence.js': patch
---

The schema audit reports a grown enum as drift rather than as breakage.

Now that a documented set of values accepts any string, the nightly audit is the only run that still validates those
sets strictly — which is the point, since it exists to find where the specification has fallen behind. Without
somewhere to put the finding it would simply have thrown, and a single stale enum would have ended the run.

`SchemaDrift` is now a union of two kinds. `keys` is what it always was, a field the spec never described; `value` is
the same gap one level down, a value outside the set a described field lists. The report prints them as separate
tables, because the repair differs — a missing key is added to a schema, a missing value to an enum.

Inside a union a value outside the documented set is not counted: that is how zod says "wrong branch", and reading it
as drift would name the first branch tried as a grown enum and stop the search before the branch that matched.
