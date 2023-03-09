import { UpdateInlineCommentModel } from '../models';

export interface UpdateInlineComment extends UpdateInlineCommentModel {
  /** The ID of the comment to be retrieved. */
  'comment-id': number;
}
