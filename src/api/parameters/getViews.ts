export interface GetViews {
  /** The ID of the content to get the views for. */
  contentId: string;
  /** The number of views for the content since the date. */
  fromDate?: string;
}
