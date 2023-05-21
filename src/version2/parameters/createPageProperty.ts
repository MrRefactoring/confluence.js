import { ContentPropertyCreateRequest } from '../models';

export interface CreatePageProperty extends ContentPropertyCreateRequest {
  /** The ID of the page to create a property for. */
  pageId: number;
}
