import { z } from 'zod';

export const ContentIdSchema = z.string();

export type ContentId = z.infer<typeof ContentIdSchema>;
