import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentStatusSchema } from './contentStatus';
import { ParentContentTypeSchema } from './parentContentType';
import { VersionSchema } from './version';
import { BodySummarySchema } from './bodySummary';
import { AbstractPageLinksSchema } from './abstractPageLinks';

export const PageSummarySchema = apiObject({
  /** ID of the page. */
  id: z.string().optional(),
  status: ContentStatusSchema.optional(),
  /** Title of the page. */
  title: z.string().optional(),
  /** ID of the space the page is in. */
  spaceId: z.string().optional(),
  /** ID of the parent page, or null if there is no parent page. */
  parentId: z.string().nullish(),
  parentType: ParentContentTypeSchema.nullish(),
  /** Position of child page within the given parent page tree. */
  position: z.number().nullish(),
  /** The account ID of the user who created this page originally. */
  authorId: z.string().optional(),
  /** The account ID of the user who owns this page. */
  ownerId: z.string().nullish(),
  /** The account ID of the user who owned this page previously, or null if there is no previous owner. */
  lastOwnerId: z.string().nullish(),
  /** The subtype of the page. */
  subtype: z.string().nullish(),
  /** Date and time when the page was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt: z.coerce.date().optional(),
  version: VersionSchema.nullish(),
  body: BodySummarySchema.nullish(),
  _links: AbstractPageLinksSchema.nullish(),
  sourceTemplateEntityId: z.string().optional(),
});

export type PageSummary = z.infer<typeof PageSummarySchema>;
