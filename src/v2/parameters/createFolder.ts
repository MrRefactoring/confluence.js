import { z } from 'zod';

export const CreateFolderSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateFolder = z.input<typeof CreateFolderSchema>;
