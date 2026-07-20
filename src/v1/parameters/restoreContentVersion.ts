import { z } from 'zod';
import { VersionRestoreSchema } from '../models';

export const RestoreContentVersionSchema = z
  .object({
    /** The ID of the content for which the history will be restored. */
    id: z.string(),
    /**
     * A multi-value parameter indicating which properties of the content to expand. By default, the `content` object is
     * expanded.
     *
     * - `collaborators` returns the users that collaborated on the version.
     * - `content` returns the content for the version.
     */
    expand: z.array(z.string()).optional(),
  })
  .extend(VersionRestoreSchema.shape);

export type RestoreContentVersion = z.input<typeof RestoreContentVersionSchema>;
