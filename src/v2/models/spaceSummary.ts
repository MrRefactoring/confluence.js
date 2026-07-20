import { z } from 'zod';
import { apiObject } from '#/core';
import { SpaceTypeSchema } from './spaceType';
import { SpaceStatusSchema } from './spaceStatus';
import { SpaceDescriptionSchema } from './spaceDescription';
import { SpaceIconSchema } from './spaceIcon';
import { SpaceLinksSchema } from './spaceLinks';

export const SpaceSummarySchema = apiObject({
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
  /** Currently active alias for a Confluence space. */
  currentActiveAlias: z.string().optional(),
  /** Date and time when the space was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  /** ID of the space's homepage. */
  homepageId: z.string().optional(),
  description: SpaceDescriptionSchema.nullish(),
  icon: SpaceIconSchema.nullish(),
  _links: SpaceLinksSchema.nullish(),
});

export type SpaceSummary = z.infer<typeof SpaceSummarySchema>;
