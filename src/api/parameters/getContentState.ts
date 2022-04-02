export interface GetContentState {
  /** The Id of the page whose content state is of interest. */
  contentId: string;
  /** Set designation=DRAFT or designation=PUBLISHED. */
  designation?: string;
}
