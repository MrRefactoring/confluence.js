import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const CustomContentBodyWriteSchema = apiObject({
  /** Type of content representation used for the value field. */
  representation: z.enum(['storage', 'atlas_doc_format', 'raw']).optional(),
  /** Body of the custom content, in the format found in the representation field. */
  value: z.string().optional(),
});

export type CustomContentBodyWrite = z.infer<typeof CustomContentBodyWriteSchema>;
