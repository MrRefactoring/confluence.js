import type { CreateAttachments } from './createAttachments';
import type { ExtractBaseType } from '~/interfaces';

export interface UpdateAttachmentData {
  /** The ID of the content that the attachment is attached to. */
  id: string;
  /** The ID of the attachment to update. */
  attachmentId: string;

  /** Attachment data to update. */
  attachment: ExtractBaseType<CreateAttachments['attachments']>;
}
