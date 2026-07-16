import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { TaskSchema } from './task.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const TasksSchema = apiObject({
  results: z.array(TaskSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type Tasks = z.infer<typeof TasksSchema>;
