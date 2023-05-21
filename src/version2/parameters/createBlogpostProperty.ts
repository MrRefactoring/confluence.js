import { ContentPropertyCreateRequest } from '../models';

export interface CreateBlogpostProperty extends ContentPropertyCreateRequest {
  /** The ID of the blog post to create a property for. */
  blogpostId: number;
}
