import { ContentCreate } from '../models';

export interface CreateContent extends ContentCreate {
  /** Filter the returned content by status. */
  status?: string;
  /**
   * A multi-value parameter indicating which properties of the content to expand.
   */
  expand?: string[];
}
