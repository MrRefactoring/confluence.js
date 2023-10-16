import { SpaceDescriptionFormat } from '../models';

export interface GetSpaceById {
  /** The ID of the space to be returned. */
  id: string;
  /**
   * The content format type to be returned in the `description` field of the response. If available, the representation
   * will be available under a response field of the same name under the `description` field.
   */
  descriptionFormat: SpaceDescriptionFormat;
}
