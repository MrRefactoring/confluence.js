import { z } from 'zod';
import { apiObject } from '#/core';
/** This object is used when creating or updating content. */

export const ContentBodyCreateStorageSchema = apiObject({
  /** The body of the content in the relevant format. */
  value: z.string(),
  /** The content format type. Set the value of this property to the name of the format being used, e.g. 'storage'. */
  representation: z.enum([
    'storage',
    'view',
    'export_view',
    'styled_view',
    'editor',
    'editor2',
    'anonymous_export_view',
    'wiki',
    'atlas_doc_format',
  ]),
});

export type ContentBodyCreateStorage = z.infer<typeof ContentBodyCreateStorageSchema>;
