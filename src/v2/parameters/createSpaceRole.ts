import { z } from 'zod';

export const CreateSpaceRoleSchema = z.object({
  /** Name of the space role */
  name: z.string(),
  /** Description for the space role */
  description: z.string(),
  /**
   * The ids of the space permissions associated with the space role. Sample value "read/space"; retrieve ids from
   * responses returned by [GET
   * /space-permissions](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-space-permissions/#api-space-permissions-get)
   * endpoint
   */
  spacePermissions: z.array(z.string()),
});

export type CreateSpaceRole = z.input<typeof CreateSpaceRoleSchema>;
