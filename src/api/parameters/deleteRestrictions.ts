export interface DeleteRestrictions {
  /** The ID of the content to remove restrictions from. */
  id: string;
  /** A multi-value parameter indicating which properties of the content
   restrictions (returned in response) to expand.

   - `restrictions.user` returns the piece of content that the restrictions are
   applied to. Expanded by default.
   - `restrictions.group` returns the piece of content that the restrictions are
   applied to. Expanded by default.
   - `content` returns the piece of content that the restrictions are
   applied to. */
  expand?: string[];
}
