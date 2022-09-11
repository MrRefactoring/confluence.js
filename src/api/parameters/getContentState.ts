export interface GetContentState {
  /** The id of the content whose content state is of interest. */
  id?: string;
  /** Set status to one of [current,draft,archived]. */
  status?: 'current' | 'draft' | 'archived' | string;

  /** @deprecated The Id of the page whose content state is of interest. */
  contentId?: string;
  /** @deprecated Set designation=DRAFT or designation=PUBLISHED. */
  designation?: 'DRAFT' | 'PUBLISHED' | string;
}
