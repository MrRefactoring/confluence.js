import { z } from 'zod';
import { AuditRecordCreateSchema } from '../models';

export const CreateAuditRecordSchema = z.object(AuditRecordCreateSchema.shape);

export type CreateAuditRecord = z.input<typeof CreateAuditRecordSchema>;
