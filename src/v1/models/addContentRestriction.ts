import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericUserNameSchema } from './genericUserName';
import { GenericUserKeySchema } from './genericUserKey';
import { GenericAccountIdSchema } from './genericAccountId';

export const AddContentRestrictionSchema = apiObject({
  /** The restriction operation applied to content. */
  operation: z.enum(['read', 'update']),
  /**
   * The users/groups that the restrictions will be applied to. At least one of `user` or `group` must be specified
   * for this object.
   */
  restrictions: apiObject({
    /**
     * The users that the restrictions will be applied to. This array must have at least one item, otherwise it
     * should be omitted.
     */
    user: z
      .array(
        apiObject({
          /** Set to 'known'. */
          type: z.enum(['known', 'unknown', 'anonymous', 'user']),
          username: GenericUserNameSchema.optional(),
          userKey: GenericUserKeySchema.optional(),
          accountId: GenericAccountIdSchema,
        }),
      )
      .optional(),
    /**
     * The groups that the restrictions will be applied to. This array must have at least one item, otherwise it
     * should be omitted.
     */
    group: z
      .array(
        apiObject({
          /** Set to 'group'. */
          type: z.enum(['group']),
          /** The name of the group. */
          name: z.string(),
        }),
      )
      .optional(),
  }),
});

export type AddContentRestriction = z.infer<typeof AddContentRestrictionSchema>;
