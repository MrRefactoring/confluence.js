import { z } from 'zod';
import { PrimaryBodyRepresentationSchema } from '../models';

export const UpdateTaskSchema = z.object({
  /** The ID of the task to be updated. If you don't know the task ID, use Get tasks and filter the results. */
  id: z.number(),
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  bodyFormat: PrimaryBodyRepresentationSchema.optional(),
  body: z.record(z.string(), z.any()).optional(),
});

export type UpdateTask = z.input<typeof UpdateTaskSchema>;
