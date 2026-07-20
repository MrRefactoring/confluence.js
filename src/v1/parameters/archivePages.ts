import { z } from 'zod';

export const ArchivePagesSchema = z.object({
  pages: z
    .array(
      z.object({
        /** The `id` of the page to be archived. */
        id: z.number(),
      }),
    )
    .optional(),
});

export type ArchivePages = z.input<typeof ArchivePagesSchema>;
