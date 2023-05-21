import { ContentPropertyCreateRequest } from '../models';

export interface CreateCustomContentProperty extends ContentPropertyCreateRequest {
  /** The ID of the custom content to create a property for. */
  customContentId: number;
}
