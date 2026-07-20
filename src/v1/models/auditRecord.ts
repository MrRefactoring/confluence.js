import { z } from 'zod';
import { apiObject } from '#/core';
import { OperationCheckResultSchema } from './operationCheckResult';
import { GenericUserNameSchema } from './genericUserName';
import { GenericUserKeySchema } from './genericUserKey';
import { GenericAccountIdSchema } from './genericAccountId';
import { AffectedObjectSchema } from './affectedObject';
import { ChangedValueSchema } from './changedValue';

export const AuditRecordSchema = apiObject({
  author: apiObject({
    type: z.enum(['user']),
    displayName: z.string(),
    operations: z.array(OperationCheckResultSchema).nullish(),
    username: GenericUserNameSchema.optional(),
    userKey: GenericUserKeySchema.optional(),
    accountId: GenericAccountIdSchema.optional(),
    accountType: z.string().optional(),
    /** This is deprecated. Use `isGuest` instead. */
    externalCollaborator: z.boolean().optional(),
    /** This is deprecated. Use `isGuest` instead. Whether the user is an external collaborator user */
    isExternalCollaborator: z.boolean().optional(),
    /** Whether the user is a guest user */
    isGuest: z.boolean().optional(),
    /** The public name or nickname of the user. Will always contain a value. */
    publicName: z.string().optional(),
  }),
  remoteAddress: z.string(),
  /** The creation date-time of the audit record, as a timestamp. */
  creationDate: z.number(),
  summary: z.string(),
  description: z.string(),
  category: z.string(),
  sysAdmin: z.boolean(),
  superAdmin: z.boolean().optional(),
  affectedObject: AffectedObjectSchema,
  changedValues: z.array(ChangedValueSchema),
  associatedObjects: z.array(AffectedObjectSchema),
});

export type AuditRecord = z.infer<typeof AuditRecordSchema>;
