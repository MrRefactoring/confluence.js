export interface GetAttachmentById {
  /**
   * The ID of the attachment to be returned. If you don't know the attachment's ID, use Get attachments for
   * page/blogpost/custom content.
   */
  id: number;
  /**
   * Allows you to retrieve a previously published version. Specify the previous version's number to retrieve its
   * details.
   */
  version?: number;
}
