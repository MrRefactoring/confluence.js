import type { CreateAttachments } from './createAttachments.js';
import type { ExtractBaseType } from '../../interfaces/index.js';

export interface UpdateAttachmentData {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to update. */
  attachmentId: string;

  /** Attachment data to update. */
  attachment: ExtractBaseType<CreateAttachments['attachments']>;
}
