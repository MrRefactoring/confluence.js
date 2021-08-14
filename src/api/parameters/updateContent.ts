import { ContentUpdate } from '../models';

export interface UpdateContent extends ContentUpdate {
  /** The ID of the content to be updated. */
  id: string;

  /**
   * The updated status of the content. Use this parameter to change the status of a piece of content without passing
   * the entire request body.
   */
  status?: 'current' | 'trashed' | 'historical' | 'draft' | string;

  /** The action that should be taken when conflicts are discovered. Only used when publishing a draft page. */
  conflictPolicy?: string;

  /**
   * The updated status of the content. Note, if you change the status of a page from 'current' to 'draft' and it has an
   * existing draft, the existing draft will be deleted in favor of the updated page.
   */
  statusBody?: 'current' | 'trashed' | 'historical' | 'draft';
}
