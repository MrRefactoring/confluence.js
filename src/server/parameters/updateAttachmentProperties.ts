import { AttachmentUpdate } from '../models';

export interface UpdateAttachmentProperties extends AttachmentUpdate {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to update. */
  attachmentId: string;
}
