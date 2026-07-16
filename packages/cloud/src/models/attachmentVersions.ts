import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { AttachmentVersionSchema } from './attachmentVersion.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const AttachmentVersionsSchema = apiObject({
  results: z.array(AttachmentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AttachmentVersions = z.infer<typeof AttachmentVersionsSchema>;
