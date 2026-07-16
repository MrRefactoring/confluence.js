import { z } from 'zod';

export const UpdateSpaceRoleSchema = z.object({
  /** Id of the space role */
  id: z.string(),
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
  /**
   * If space anonymous access is assigned to the role being modified, the Id of a role to migrate those assignments to
   * can be specified. Anonymous access role assignments left unchanged if unspecified.
   */
  anonymousReassignmentRoleId: z.string().optional(),
  /**
   * If guests are assigned to the role being modified, the Id of a role to migrate those assignments to can be
   * specified. Guest role assignments left unchanged if unspecified.
   */
  guestReassignmentRoleId: z.string().optional(),
});

export type UpdateSpaceRole = z.input<typeof UpdateSpaceRoleSchema>;
