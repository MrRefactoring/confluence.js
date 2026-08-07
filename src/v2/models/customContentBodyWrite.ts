import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const CustomContentBodyWriteSchema = apiObject({
  /** Type of content representation used for the value field. */
  representation: openEnum(['storage', 'atlas_doc_format', 'raw']).optional(),
  /** Body of the custom content, in the format found in the representation field. */
  value: z.string().optional(),
});

export type CustomContentBodyWrite = z.infer<typeof CustomContentBodyWriteSchema>;
