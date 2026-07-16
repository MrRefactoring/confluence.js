import { z } from 'zod';

export const CreateDatabaseSchema = z.object({
  /** The database will be private. Only the user who creates this database will have permission to view and edit one. */
  private: z.boolean().optional(),
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateDatabase = z.input<typeof CreateDatabaseSchema>;
