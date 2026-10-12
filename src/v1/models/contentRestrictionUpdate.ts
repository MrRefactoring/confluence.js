import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { UserSchema, type User, type UserInput } from './user';
import { UserArraySchema, type UserArray, type UserArrayInput } from './userArray';
import { ContentSchema, type Content, type ContentInput } from './content';

export const ContentRestrictionUpdateSchema = apiObject({
  /** The restriction operation applied to content. */
  operation: openEnum([
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
          type: openEnum(['group']),
          /** The id of the group. */
          id: z.string().optional(),
        }),
      )
      .optional(),
    user: z
      .union([
        z.array(UserSchema as z.ZodType<User, UserInput>),
        UserArraySchema as z.ZodType<UserArray, UserArrayInput>,
      ])
      .optional(),
  }),
  content: (ContentSchema as z.ZodType<Content, ContentInput>).optional(),
});

export type ContentRestrictionUpdate = z.infer<typeof ContentRestrictionUpdateSchema>;
