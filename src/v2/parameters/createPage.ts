import { z } from 'zod';

export const CreatePageSchema = z.object({
  /** Tag the content as embedded and content will be created in NCS. */
  embedded: z.boolean().optional(),
  /** The page will be private. Only the user who creates this page will have permission to view and edit one. */
  private: z.boolean().optional(),
  /**
   * The page will be created at the root level of the space (outside the space homepage tree). If true, then a value
   * may not be supplied for the `parentId` body parameter.
   */
  rootLevel: z.boolean().optional(),
  body: z.record(z.string(), z.any()).optional(),
});

export type CreatePage = z.input<typeof CreatePageSchema>;
