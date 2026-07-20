import { z } from 'zod';
import { apiObject } from '#/core';
import { IconSchema } from './icon';
import { OperationCheckResultSchema } from './operationCheckResult';
import { GenericLinksSchema } from './genericLinks';

export const UserAnonymousSchema = apiObject({
  type: z.string(),
  profilePicture: IconSchema,
  displayName: z.string(),
  operations: z.array(OperationCheckResultSchema).optional(),
  _expandable: apiObject({
    operations: z.string().optional(),
  }).optional(),
  _links: GenericLinksSchema,
});

export type UserAnonymous = z.infer<typeof UserAnonymousSchema>;
