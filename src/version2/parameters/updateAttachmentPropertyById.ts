import { ContentPropertyUpdateRequest } from '../models';

export interface UpdateAttachmentPropertyById extends ContentPropertyUpdateRequest {
  /** The ID of the attachment the property belongs to. */
  attachmentId: string;
  /** The ID of the property to be updated. */
  propertyId: number;
}
