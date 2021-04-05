import { AttachmentUpdate } from '../models';

export interface UpdateAttachmentProperties {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to update. */
  attachmentId: string;

  body: AttachmentUpdate;
}
