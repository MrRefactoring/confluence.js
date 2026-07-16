import { z } from 'zod';
import { apiObject } from '#/core';
import { AttachmentVersionSchema } from './attachmentVersion';
import { MultiEntityLinksSchema } from './multiEntityLinks';

export const AttachmentVersionsSchema = apiObject({
  results: z.array(AttachmentVersionSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type AttachmentVersions = z.infer<typeof AttachmentVersionsSchema>;
