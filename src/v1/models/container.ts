import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';
/**
 * Container for content. This can be either a space (containing a page or blogpost)* or a page/blog post (containing an
 * attachment or comment)
 */

export const ContainerSchema = apiObject({
  id: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  ari: z.string().optional(),
  base64EncodedAri: z.string().optional(),
  extensions: z.record(z.string(), z.any()).optional(),
  macroRenderedOutput: z.record(z.string(), z.any()).optional(),
  _links: GenericLinksSchema.optional(),
  _expandable: z.record(z.string(), z.any()).optional(),
});

export type Container = z.infer<typeof ContainerSchema>;
