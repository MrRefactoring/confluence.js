import { ContentPropertyUpdateRequest } from '../models';

export interface UpdatePagePropertyById extends ContentPropertyUpdateRequest {
  /** The ID of the page the property belongs to. */
  pageId: number;
  /** The ID of the property to be updated. */
  propertyId: number;
}
