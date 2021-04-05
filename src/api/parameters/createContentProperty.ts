import { ContentPropertyCreate } from '../models';

export interface CreateContentProperty extends ContentPropertyCreate {
  /** The ID of the content to add the property to. */
  id: string;
}
