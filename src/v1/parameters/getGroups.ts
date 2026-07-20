import { z } from 'zod';

export const GetGroupsSchema = z.object({
  /** The starting index of the returned groups. */
  start: z.number().optional(),
  /** The maximum number of groups to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
  /** The group permission level for which to filter results. */
  accessType: z.enum(['user', 'admin', 'site-admin']).optional(),
});

export type GetGroups = z.input<typeof GetGroupsSchema>;
