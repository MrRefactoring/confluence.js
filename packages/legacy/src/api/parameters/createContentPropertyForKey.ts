import type { ContentPropertyCreateNoKey } from '../models/index.js';

export interface CreateContentPropertyForKey extends ContentPropertyCreateNoKey {
  /** The ID of the content to add the property to. */
  id: string;
  /** The key of the content property. Required. */
  key: string;
}
