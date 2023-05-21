import { CommentBodyWrite } from './commentBodyWrite';

/** Body of the comment. Only one body format should be specified as the property* for this object, e.g. `storage`. */
export interface CommentNestedBodyWrite {
  storage?: CommentBodyWrite;
  atlasDocFormat?: CommentBodyWrite;
  wiki?: CommentBodyWrite;
}
