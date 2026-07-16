import { z } from 'zod';
import { PrimaryBodyRepresentationSchema } from '../models/index.js';

export const GetTasksSchema = z.object({
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation
   * will be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
  /** Specifies whether to include blank tasks in the response. Defaults to `true`. */
  includeBlankTasks: z.boolean().optional(),
  /** Filters on the status of the task. */
  status: z.enum(['complete', 'incomplete']).optional(),
  /** Filters on task ID. Multiple IDs can be specified. */
  taskId: z.array(z.number()).optional(),
  /** Filters on the space ID of the task. Multiple IDs can be specified. */
  spaceId: z.array(z.number()).optional(),
  /**
   * Filters on the page ID of the task. Multiple IDs can be specified. Note - page and blog post filters can be used
   * in conjunction.
   */
  pageId: z.array(z.number()).optional(),
  /**
   * Filters on the blog post ID of the task. Multiple IDs can be specified. Note - page and blog post filters can be
   * used in conjunction.
   */
  blogpostId: z.array(z.number()).optional(),
  /** Filters on the Account ID of the user who created this task. Multiple IDs can be specified. */
  createdBy: z.array(z.string()).optional(),
  /** Filters on the Account ID of the user to whom this task is assigned. Multiple IDs can be specified. */
  assignedTo: z.array(z.string()).optional(),
  /** Filters on the Account ID of the user who completed this task. Multiple IDs can be specified. */
  completedBy: z.array(z.string()).optional(),
  /**
   * Filters on start of date-time range of task based on creation date (inclusive). Input is epoch time in
   * milliseconds.
   */
  createdAtFrom: z.number().optional(),
  /**
   * Filters on end of date-time range of task based on creation date (inclusive). Input is epoch time in
   * milliseconds.
   */
  createdAtTo: z.number().optional(),
  /** Filters on start of date-time range of task based on due date (inclusive). Input is epoch time in milliseconds. */
  dueAtFrom: z.number().optional(),
  /** Filters on end of date-time range of task based on due date (inclusive). Input is epoch time in milliseconds. */
  dueAtTo: z.number().optional(),
  /**
   * Filters on start of date-time range of task based on completion date (inclusive). Input is epoch time in
   * milliseconds.
   */
  completedAtFrom: z.number().optional(),
  /**
   * Filters on end of date-time range of task based on completion date (inclusive). Input is epoch time in
   * milliseconds.
   */
  completedAtTo: z.number().optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of tasks per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetTasks = z.input<typeof GetTasksSchema>;
