export interface PublishLegacyDraft {
  /** The ID of the draft page that was created from a blueprint.
   You can find the `draftId` in the Confluence application by
   opening the draft page and checking the page URL. */
  draftId: string;
  /** The status of the content to be updated, i.e. the draft. This is set
   to 'draft' by default, so you shouldn't need to specify it. */
  status?: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
}
