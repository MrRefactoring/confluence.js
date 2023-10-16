import { ContentPropertyCreateRequest } from '../models';

export interface CreateAttachmentProperty extends ContentPropertyCreateRequest {
  /** The ID of the attachment to create a property for. */
  attachmentId: string;
}
