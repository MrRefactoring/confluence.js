export interface GetLabelsForContent {
  /** The ID of the content to be queried for its labels. */
  id: string;
  /** Filters the results to labels with the specified prefix. If this parameter
   is not specified, then labels with any prefix will be returned.

   - `global` prefix is used by default when a user adds a label
   via the UI.
   - `my` prefix can be explicitly added by a user when adding a label
   via the UI, e.g. 'my:example-label'. Also, when a page is selected as
   a favourite, the 'my:favourite' label is automatically added.
   - `team` can used when adding labels via [Add labels to content](#api-content-id-label-post)
   but is not used in the UI. */
  prefix?: string;
  /** The starting index of the returned labels. */
  start?: number;
  /** The maximum number of labels to return per page. Note,
   this may be restricted by fixed system limits. */
  limit?: number;
}
