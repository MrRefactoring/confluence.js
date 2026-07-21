import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceTypeSchema } from './spaceType';
import { SpaceStatusSchema } from './spaceStatus';
import { SpaceDescriptionSchema } from './spaceDescription';
import { SpaceIconSchema } from './spaceIcon';
import { LabelSchema } from './label';
import { OptionalFieldMetaSchema } from './optionalFieldMeta';
import { OptionalFieldLinksSchema } from './optionalFieldLinks';
import { SpacePropertySchema } from './spaceProperty';
import { OperationSchema } from './operation';
import { SpacePermissionAssignmentSchema } from './spacePermissionAssignment';
import { SpaceLinksSchema } from './spaceLinks';

export const SpaceSchema = apiObject({
  /** ID of the space. */
  id: z.string().optional(),
  /** Key of the space. */
  key: z.string().optional(),
  /** Name of the space. */
  name: z.string().optional(),
  type: SpaceTypeSchema.optional(),
  status: SpaceStatusSchema.optional(),
  /** The account ID of the user who created this space originally. */
  authorId: z.string().optional(),
  /** The account ID of the user who owns this space. */
  spaceOwnerId: z.string().optional(),
  /** Date and time when the space was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /** ID of the space's homepage. */
  homepageId: z.string().optional(),
  description: SpaceDescriptionSchema.nullish(),
  icon: SpaceIconSchema.nullish(),
  labels: apiObject({
    results: z.array(LabelSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  properties: apiObject({
    results: z.array(SpacePropertySchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  operations: apiObject({
    results: z.array(OperationSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  permissions: apiObject({
    results: z.array(SpacePermissionAssignmentSchema).nullish(),
    meta: OptionalFieldMetaSchema.nullish(),
    _links: OptionalFieldLinksSchema.nullish(),
  }).nullish(),
  _links: SpaceLinksSchema.nullish(),
  currentActiveAlias: z.string().optional(),
});

export type Space = z.infer<typeof SpaceSchema>;
