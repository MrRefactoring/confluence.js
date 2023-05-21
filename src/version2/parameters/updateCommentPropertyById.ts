import { ContentPropertyUpdateRequest } from '../models';

export interface UpdateCommentPropertyById extends ContentPropertyUpdateRequest {
  /** The ID of the comment the property belongs to. */
  commentId: number;
  /** The ID of the property to be updated. */
  propertyId: number;
}
