import { z } from 'zod';
import { apiObject } from '#/core';
/** This object is used when creating or updating content. */

export const ContentBodyCreateSchema = apiObject({
  /** The body of the content in the relevant format. */
  value: z.string(),
  /** The content format type. Set the value of this property to the name of the format being used, e.g. 'storage'. */
  representation: z.enum([
    'view',
    'export_view',
    'styled_view',
    'storage',
    'editor',
    'editor2',
    'anonymous_export_view',
    'wiki',
    'atlas_doc_format',
    'plain',
    'raw',
  ]),
});

export type ContentBodyCreate = z.infer<typeof ContentBodyCreateSchema>;
