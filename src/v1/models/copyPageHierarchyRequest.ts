import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentIdSchema } from './contentId';
import { CopyPageHierarchyTitleOptionsSchema } from './copyPageHierarchyTitleOptions';

export const CopyPageHierarchyRequestSchema = apiObject({
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
  /** If set to `true`, descendants are copied to the destination page. */
  copyDescendants: z.boolean().optional(),
  destinationPageId: ContentIdSchema,
  titleOptions: CopyPageHierarchyTitleOptionsSchema.optional(),
});

export type CopyPageHierarchyRequest = z.infer<typeof CopyPageHierarchyRequestSchema>;
