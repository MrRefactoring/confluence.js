import { z } from 'zod';

export const CreateSpaceSchema = z.strictObject({
  /** The name of the space to be created. */
  name: z.string(),
  /**
   * The key for the new space. See [Space Keys](https://support.atlassian.com/confluence-cloud/docs/create-a-space/).
   * If the key property is not provided, the alias property is required to be used instead.
   */
  key: z.string().optional(),
  /**
   * This field will be used as the new identifier for the space in confluence page URLs. If the alias property is not
   * provided, the key property is required to be used instead. Maximum 255 alphanumeric characters in length.
   */
  alias: z.string().max(255).optional(),
  /** The description of the new/updated space. Note, only the 'plain' representation is currently supported. */
  description: z
    .strictObject({
      /** The space description. */
      value: z.string(),
      /** The format of the description. */
      representation: z.string(),
    })
    .optional(),
  /**
   * The role assignments for the new space. If none are provided, the Default Space Roles are applied. If roles are
   * provided, the space is created with exactly the provided set of roles. A private space is created if only the
   * creator is assigned to a role and it’s the Admin role. At least one Admin role assignment must be specified.
   */
  roleAssignments: z
    .strictObject({
      /** The principal of the role assignment. */
      principal: z.strictObject({
        /** The principal type. */
        principalType: z.enum(['USER', 'GROUP', 'ACCESS_CLASS']),
        /** The principal ID. */
        principalId: z.string(),
      }),
      /** The role to which the principal is assigned. */
      roleId: z.string(),
    })
    .optional(),
});

export type CreateSpace = z.infer<typeof CreateSpaceSchema>;
