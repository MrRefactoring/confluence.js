import { AttachmentUpdate } from '../models';

export interface UpdateAttachmentData extends AttachmentUpdate {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to update. */
  attachmentId: string;
}
