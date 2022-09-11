import { ContentStateRestInput } from '../models';

export interface SetContentState extends ContentStateRestInput {
  /** The Id of the content whose content state is to be set. */
  id?: string;
  /**
   * Status of content onto which state will be placed. If draft, then draft state will change. If current, state will
   * be placed onto a new version of the content with same body as previous version.
   */
  status?: 'current' | 'draft' | string;

  /** @deprecated The Id of the content whose content state is to be set. */
  contentId?: string;
  /** @deprecated The Id of the content */
  contentStateId?: number;
}
