import { CreateAttachments } from './createAttachments';

export interface CreateOrUpdateAttachments {
  /** The ID of the content to add the attachment to. */
  id: string;
  /** The status of the content that the attachment is being added to. This should always be set to 'current'. */
  status?: 'current' | 'draft' | string;

  /** The attachments to be created or updated. */
  attachments: CreateAttachments.Attachment | CreateAttachments.Attachment[];
}
