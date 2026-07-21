import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';

export const GroupSchema = apiObject({
  type: z.enum(['group']),
  name: z.string(),
  id: z.string(),
  /**
   * This property represents how this collection of users is used:
   *
   * - `USERBASE_GROUP`: This value indicates that the collection of users is used as a group.
   * - `TEAM_COLLABORATION`: This value indicates that the collection of users is used as a team.
   */
  usageType: z.enum(['USERBASE_GROUP', 'TEAM_COLLABORATION']).optional(),
  /**
   * This property represents how this collection of users is managed:
   *
   * - `ADMINS`: This value indicates that the collection of users is managed by org, site or product admins.
   * - `EXTERNAL`: This value indicates that the collection of users is managed externally (through SCIM, HRIS, etc.).
   * - `TEAM_MEMBERS`: This value indicates that the collection of users is managed by its members.
   * - `OPEN`: This value indicates that the collection of users is not actively managed by any users.
   */
  managedBy: z.enum(['ADMINS', 'EXTERNAL', 'TEAM_MEMBERS', 'OPEN']).optional(),
  _links: GenericLinksSchema.optional(),
  resourceAri: z.string().optional(),
});

export type Group = z.infer<typeof GroupSchema>;
