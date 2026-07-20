import { z } from 'zod';
import { apiObject } from '#/core';

export const VersionRestoreSchema = apiObject({
  /** Set to 'restore'. */
  operationKey: z.enum(['restore']),
  params: apiObject({
    /** The version number to be restored. */
    versionNumber: z.number(),
    /** Description for the version. */
    message: z.string(),
    /** If true, the content title will be the same as the title from the version restored. Defaults to `false`. */
    restoreTitle: z.boolean().optional(),
  }),
});

export type VersionRestore = z.infer<typeof VersionRestoreSchema>;
