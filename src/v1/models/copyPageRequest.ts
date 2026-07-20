import { z } from 'zod';
import { apiObject } from '#/core';
import { CopyPageRequestDestinationSchema } from './copyPageRequestDestination';
import { ContentBodyCreateSchema } from './contentBodyCreate';

export const CopyPageRequestSchema = apiObject({
  /** If set to `true`, attachments are copied to the destination page. */
  copyAttachments: z.boolean().optional(),
  /** If set to `true`, page permissions are copied to the destination page. */
  copyPermissions: z.boolean().optional(),
  /** If set to `true`, content properties are copied to the destination page. */
  copyProperties: z.boolean().optional(),
  /** If set to `true`, labels are copied to the destination page. */
  copyLabels: z.boolean().optional(),
  /** If set to `true`, custom contents are copied to the destination page. */
  copyCustomContents: z.boolean().optional(),
  destination: CopyPageRequestDestinationSchema,
  /** If defined, this will replace the title of the destination page. */
  pageTitle: z.string().optional(),
  /** If defined, this will replace the body of the destination page. */
  body: apiObject({
    storage: ContentBodyCreateSchema.optional(),
    editor2: ContentBodyCreateSchema.optional(),
  }).optional(),
});

export type CopyPageRequest = z.infer<typeof CopyPageRequestSchema>;
