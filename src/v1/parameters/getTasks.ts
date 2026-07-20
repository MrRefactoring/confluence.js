import { z } from 'zod';

export const GetTasksSchema = z.object({
  /** The key of the tasks. */
  key: z.string().optional(),
  /** The starting index of the returned tasks. */
  start: z.number().optional(),
  /** The maximum number of tasks to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetTasks = z.input<typeof GetTasksSchema>;
