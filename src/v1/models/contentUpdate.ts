import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentBodyCreateSchema } from './contentBodyCreate';
import { ContentBodyCreateStorageSchema } from './contentBodyCreateStorage';

export const ContentUpdateSchema = apiObject({
  /**
   * The new version for the updated content. Set this to the current version number incremented by one, unless you
   * are changing the status to 'draft' which must have a version number of 1.
   *
   * To get the current version number, use [Get content by ID](#api-content-id-get) and retrieve `version.number`.
   */
  version: apiObject({
    /** The version number. */
    number: z.number(),
    /** An optional message to be stored with the corresponding version. */
    message: z.string().nullish(),
  }).nullable(),
  /**
   * The updated title of the content. If you are updating a non-draft `page` or `blogpost`, title is required. If you
   * are not changing the title, set this field to the the current title.
   */
  title: z.string().max(255, 'title must be at most 255 characters').nullish(),
  /**
   * The type of content. Set this to the current type of the content. For example, - page - blogpost - comment -
   * attachment
   */
  type: z.string().nullable(),
  /**
   * The updated status of the content. Note, if you change the status of a page from 'current' to 'draft' and it has
   * an existing draft, the existing draft will be deleted in favor of the updated page.
   */
  status: z.enum(['current', 'trashed', 'deleted', 'historical', 'draft']).optional(),
  /** The new parent for the content. Only one parent content 'id' can be specified. */
  ancestors: z
    .array(
      apiObject({
        /** The `id` of the parent content. */
        id: z.union([z.number(), z.string()]),
      }),
    )
    .nullish(),
  /**
   * The updated body of the content. Does not apply to attachments. If you are not sure how to generate these
   * formats, you can create a page in the Confluence application, retrieve the content using [Get
   * content](#api-content-get), and expand the desired content format, e.g. `expand=body.storage`.
   */
  body: apiObject({
    view: ContentBodyCreateSchema.optional(),
    export_view: ContentBodyCreateSchema.optional(),
    styled_view: ContentBodyCreateSchema.optional(),
    storage: ContentBodyCreateStorageSchema.optional(),
    editor: ContentBodyCreateSchema.optional(),
    editor2: ContentBodyCreateSchema.optional(),
    wiki: ContentBodyCreateSchema.optional(),
    atlas_doc_format: ContentBodyCreateSchema.optional(),
    anonymous_export_view: ContentBodyCreateSchema.optional(),
  }).optional(),
});

export type ContentUpdate = z.infer<typeof ContentUpdateSchema>;
