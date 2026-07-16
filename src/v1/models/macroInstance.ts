import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';

export const MacroInstanceSchema = apiObject({
  name: z.string().optional(),
  body: z.string().optional(),
  parameters: z.record(z.string(), z.any()).optional(),
  _links: GenericLinksSchema.optional(),
});

export type MacroInstance = z.infer<typeof MacroInstanceSchema>;
