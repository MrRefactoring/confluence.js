import type { ContentPropertyUpdate } from '../models';

export interface UpdateContentProperty extends ContentPropertyUpdate {
  /** The ID of the content that the property belongs to. */
  id: string;
  /** The key of the property. */
  key: string;
}
