export interface GetAnonymousUser {
  /** A multi-value parameter indicating which properties of the user to
   expand.

   - `operations` returns the operations that the user is allowed to do. */
  expand?: string[];
}
