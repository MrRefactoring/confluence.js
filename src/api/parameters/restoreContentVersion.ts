import { VersionRestore } from '../models';

export interface RestoreContentVersion extends VersionRestore {
  /** The ID of the content for which the history will be restored. */
  id: string;
  /** A multi-value parameter indicating which properties of the returned
    content to expand.

    - `collaborators` returns the users that collaborated on the version.
    - `content` returns the content for the version. */
  expand?: string[];
}
