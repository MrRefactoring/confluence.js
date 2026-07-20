import { z } from 'zod';
import { apiObject } from '#/core';
import { TaskBodySchema } from './taskBody';

export const TaskSchema = apiObject({
  /** ID of the task. */
  id: z.string().optional(),
  /** Local ID of the task. This ID is local to the corresponding page or blog post. */
  localId: z.string().optional(),
  /** ID of the space the task is in. */
  spaceId: z.string().optional(),
  /** ID of the page the task is in. */
  pageId: z.string().optional(),
  /** ID of the blog post the task is in. */
  blogPostId: z.string().optional(),
  /** Status of the task. */
  status: z.enum(['complete', 'incomplete']).optional(),
  body: TaskBodySchema.nullish(),
  /** Account ID of the user who created this task. */
  createdBy: z.string().optional(),
  /** Account ID of the user to whom this task is assigned. */
  assignedTo: z.string().nullish(),
  /** Account ID of the user who completed this task. */
  completedBy: z.string().nullish(),
  /** Date and time when the task was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /** Date and time when the task was updated. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  updatedAt: z.coerce.date().optional(),
  /** Date and time when the task is due. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  dueAt: z.coerce.date().nullish(),
  /** Date and time when the task was completed. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  completedAt: z.coerce.date().nullish(),
});

export type Task = z.infer<typeof TaskSchema>;
