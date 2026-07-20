import { z } from 'zod';
import { apiObject } from '#/core';

export const PageBodyWriteSchema = apiObject({
  /** Type of content representation used for the value field. */
  representation: z.enum(['storage', 'atlas_doc_format', 'wiki']).optional(),
  /** Body of the page, in the format found in the representation field. */
  value: z.string().optional(),
});

export type PageBodyWrite = z.infer<typeof PageBodyWriteSchema>;
