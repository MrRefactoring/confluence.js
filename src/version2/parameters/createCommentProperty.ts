import { ContentPropertyCreateRequest } from '../models';

export interface CreateCommentProperty extends ContentPropertyCreateRequest {
  /** The ID of the comment to create a property for. */
  commentId: number;
}
