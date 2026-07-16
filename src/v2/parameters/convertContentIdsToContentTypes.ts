import { z } from 'zod';

export const ConvertContentIdsToContentTypesSchema = z.object({
  body: z.record(z.string(), z.any()).optional(),
});

export type ConvertContentIdsToContentTypes = z.input<typeof ConvertContentIdsToContentTypesSchema>;
