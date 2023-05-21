import { ContentPropertyUpdateRequest } from '../models';

export interface UpdateBlogpostPropertyById extends ContentPropertyUpdateRequest {
  /** The ID of the blog post the property belongs to. */
  blogpostId: number;
  /** The ID of the property to be updated. */
  propertyId: number;
}
