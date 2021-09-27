export interface GetViewers {
  /** The ID of the content to get the viewers for. */
  contentId: string;
  /** The number of views for the content since the date. */
  fromDate?: string;
}
