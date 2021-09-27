export interface DownloadAttachment {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to download. */
  attachmentId: string;
  /**
   * The version of the attachment. If this parameter is absent, the redirect URI will download the latest version of
   * the attachment.
   */
  version?: number;
}
