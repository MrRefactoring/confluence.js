export interface GetPageById {
  /** The ID of the page to be returned. If you don't know the page ID, use Get pages and filter the results. */
  id: number;
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat?: {};
  /** Retrieve the draft version of this page. */
  getDraft?: boolean;
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version?: number;
}
