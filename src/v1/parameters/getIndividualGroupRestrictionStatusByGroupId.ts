import { z } from 'zod';
import { openEnum } from '#/core';

export const GetIndividualGroupRestrictionStatusByGroupIdSchema = z.object({
  /** The ID of the content that the restriction applies to. */
  id: z.string(),
  /** The operation that the restriction applies to. */
  operationKey: openEnum(['read', 'update']),
  /** The id of the group to be queried for whether the content restriction applies to it. */
  groupId: z.string(),
});

export type GetIndividualGroupRestrictionStatusByGroupId = z.input<
  typeof GetIndividualGroupRestrictionStatusByGroupIdSchema
>;
