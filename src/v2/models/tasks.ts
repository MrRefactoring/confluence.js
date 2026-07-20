import { z } from 'zod';
import { apiObject } from '#/core';
import { TaskSchema } from './task';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const TasksSchema = apiObject({
  results: z.array(TaskSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type Tasks = z.infer<typeof TasksSchema>;
