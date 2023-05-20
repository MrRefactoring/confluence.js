export interface UpdateAttachmentData {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to update. */
  attachmentId: string;
  /** If `minorEdit` is set to 'true', no notification email or activity stream will be generated for the change. */
  minorEdit?: boolean;
  /** A comment to be added to the attachment */
  comment?: string;
  /** The actual file content to upload */
  file: Buffer;
}
