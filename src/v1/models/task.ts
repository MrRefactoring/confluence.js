import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';

export const TaskSchema = apiObject({
  globalId: z.number(),
  id: z.number(),
  contentId: z.number(),
  status: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  body: z.string().optional(),
  creator: z.string(),
  assignee: z.string().optional(),
  completeUser: z.string().optional(),
  createDate: z.number(),
  dueDate: z.number().optional(),
  updateDate: z.number().optional(),
  completeDate: z.number().optional(),
  _links: GenericLinksSchema.optional(),
});

export type Task = z.infer<typeof TaskSchema>;
