import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
import { UserArraySchema } from './userArray';
import { ContentSchema } from './content';

export const ContentRestrictionUpdateSchema = apiObject({
  /** The restriction operation applied to content. */
  operation: z.enum([
    'administer',
    'copy',
    'create',
    'delete',
    'export',
    'move',
    'purge',
    'purge_version',
    'read',
    'restore',
    'update',
    'use',
  ]),
  /**
   * The users/groups that the restrictions will be applied to. At least one of `user` or `group` must be specified for
   * this object.
   */
  restrictions: apiObject({
    /**
     * The groups that the restrictions will be applied to. This array must have at least one item, otherwise it should
     * be omitted.
     */
    group: z
      .array(
        apiObject({
          /** Set to 'group'. */
          type: z.enum(['group']),
          /** The id of the group. */
          id: z.string().optional(),
        }),
      )
      .optional(),
    user: z.union([z.array(UserSchema), UserArraySchema]).optional(),
  }),
  content: ContentSchema.optional(),
});

export type ContentRestrictionUpdate = z.infer<typeof ContentRestrictionUpdateSchema>;
