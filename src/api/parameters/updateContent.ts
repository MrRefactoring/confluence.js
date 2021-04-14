import { ContentUpdate } from '../models';

export interface UpdateContent extends ContentUpdate {
  /** The ID of the content to be updated. */
  id: string;
  /** The updated status of the content. Use this parameter to change the
   status of a piece of content without passing the entire request body. */
  status?: string;
  /** The action that should be taken when conflicts are discovered.
   Only used when publishing a draft page. */
  conflictPolicy?: string;
}
