import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const AddUserToGroupByGroupIdSchema = z
  .object({
    /** GroupId of the group whose membership is updated */
    groupId: z.string(),
  })
  .extend(AccountIdSchema.shape);

export type AddUserToGroupByGroupId = z.input<typeof AddUserToGroupByGroupIdSchema>;
