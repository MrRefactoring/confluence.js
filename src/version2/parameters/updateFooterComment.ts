import { UpdateFooterCommentModel } from '../models';

export interface UpdateFooterComment extends UpdateFooterCommentModel {
  /** The ID of the comment to be retrieved. */
  'comment-id': number;
}
