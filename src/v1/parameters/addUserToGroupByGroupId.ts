import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const AddUserToGroupByGroupIdSchema = z.object({}).extend(AccountIdSchema.shape).extend({
  /** GroupId of the group whose membership is updated */
  groupId: z.string(),
});

export type AddUserToGroupByGroupId = z.input<typeof AddUserToGroupByGroupIdSchema>;
