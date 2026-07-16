import { z } from 'zod';
import { apiObject } from '#/core';
import { AuditRecordSchema } from './auditRecord';
import { GenericLinksSchema } from './genericLinks';

export const AuditRecordArraySchema = apiObject({
  results: z.array(AuditRecordSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  _links: GenericLinksSchema,
});

export type AuditRecordArray = z.infer<typeof AuditRecordArraySchema>;
