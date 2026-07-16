import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
import { ChildCustomContentSchema } from './childCustomContent.js';
import { MultiEntityLinksSchema } from './multiEntityLinks.js';

export const ChildCustomContentGetSchema = apiObject({
  results: z.array(ChildCustomContentSchema).optional(),
  _links: MultiEntityLinksSchema.optional(),
});

export type ChildCustomContentGet = z.infer<typeof ChildCustomContentGetSchema>;
