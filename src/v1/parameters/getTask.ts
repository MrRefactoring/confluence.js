import { z } from 'zod';

export const GetTaskSchema = z.object({
  /** The ID of the task. */
  id: z.string(),
});

export type GetTask = z.input<typeof GetTaskSchema>;
