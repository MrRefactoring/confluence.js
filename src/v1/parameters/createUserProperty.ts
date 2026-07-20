import { z } from 'zod';
import { UserPropertyCreateSchema } from '../models';

export const CreateUserPropertySchema = z
  .object({
    /**
     * The account ID of the user. The accountId uniquely identifies the user across all Atlassian products. For
     * example, 384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192
     */
    userId: z.string(),
    /** The key of the user property. */
    key: z.string(),
  })
  .extend(UserPropertyCreateSchema.shape);

export type CreateUserProperty = z.input<typeof CreateUserPropertySchema>;
