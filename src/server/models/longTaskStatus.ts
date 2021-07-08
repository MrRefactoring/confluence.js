import { Message } from './message';

/**
 * Current status of a long running task
 *
 * Status keys:
 *
 * - `ERROR_UNKNOWN` - Generic error
 * - `ERROR_LOCK_FAILED` - Could not get the lock on destination space
 * - `ERROR_RELINK` - Error when relink pages/attachments
 * - `ERROR_COPY_PAGE` - Error while copying 1 page
 * - `WARN_RENAME_PAGE` - Warning page is rename during copy
 * - `WARN_IGNORE_COPY_PERMISSION` - Warning could not copy permission
 * - `WARN_IGNORE_COPY_ATTACHMENT` - Warning could not copy attachment
 * - `WARN_IGNORE_DELETE_PAGE` - Warning ignoring delete of a non agreed on page
 * - `STATUS_COPIED_PAGES` - Message total pages are copied
 * - `STATUS_COPYING_PAGES` - Message copy pages
 * - `STATUS_RELINK_PAGES` - Message relink pages/attachments
 * - `STATUS_DELETING_PAGES` - Message delete pages
 * - `STATUS_DELETED_PAGES` - Message total pages are deleted
 * - `STATUS_MOVING_PAGES` - Message move pages
 * - `WARN_IGNORE_VIEW_RESTRICTED` - Permission changed - view restricted
 * - `WARN_IGNORE_EDIT_RESTRICTED` - Permission changed - edit restricted
 * - `INITIALIZING_TASK` - Message when initializing task
 * - `UNKNOWN_STATUS` - Message when status is unknown
 */
export interface LongTaskStatus {
  id: string;
  name: {
    key: string;
    args: {}[];
  };
  elapsedTime: number;
  percentageComplete: number;
  successful: boolean;
  messages: Message[];
  status?: string;
  errors?: Message[];
  additionalDetails?: {};
}
