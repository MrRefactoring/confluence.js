import { z } from 'zod';

export const RemoveGroupFromContentRestrictionSchema = z.object({
  /** The ID of the content that the restriction applies to. */
  id: z.string(),
  /** The operation that the restriction applies to. */
  operationKey: z.enum(['read', 'update']),
  /** The id of the group to remove from the content restriction. */
  groupId: z.string(),
});

export type RemoveGroupFromContentRestriction = z.input<typeof RemoveGroupFromContentRestrictionSchema>;
