import { ContentPropertyUpdateRequest } from '../models';

export interface UpdateCustomContentPropertyById extends ContentPropertyUpdateRequest {
  /** The ID of the custom content the property belongs to. */
  customContentId: number;
  /** The ID of the property to be updated. */
  propertyId: number;
}
