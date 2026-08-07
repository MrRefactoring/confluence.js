import { z } from 'zod';
import { openEnum } from '#/core';

export const AddGroupToContentRestrictionByGroupIdSchema = z.object({
  /** The ID of the content that the restriction applies to. */
  id: z.string(),
  /** The operation that the restriction applies to. */
  operationKey: openEnum(['read', 'update']),
  /** The groupId of the group to add to the content restriction. */
  groupId: z.string(),
});

export type AddGroupToContentRestrictionByGroupId = z.input<typeof AddGroupToContentRestrictionByGroupIdSchema>;
