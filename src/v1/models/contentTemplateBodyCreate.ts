import type { z } from 'zod';
import { apiObject } from '#/core';
import { ContentBodyCreateSchema } from './contentBodyCreate';
/**
 * The body of the new content. Does not apply to attachments.* Only one body format should be specified as the property
 * for* this object, e.g. `storage`.*
 *
 * Note, `editor2` format is used by Atlassian only. `anonymous_export_view` is* the same as `export_view` format but
 * only content viewable by an anonymous* user is included.
 */

export const ContentTemplateBodyCreateSchema = apiObject({
  view: ContentBodyCreateSchema.optional(),
  export_view: ContentBodyCreateSchema.optional(),
  styled_view: ContentBodyCreateSchema.optional(),
  storage: ContentBodyCreateSchema.optional(),
  editor: ContentBodyCreateSchema.optional(),
  editor2: ContentBodyCreateSchema.optional(),
  wiki: ContentBodyCreateSchema.optional(),
  atlas_doc_format: ContentBodyCreateSchema.optional(),
  anonymous_export_view: ContentBodyCreateSchema.optional(),
});

export type ContentTemplateBodyCreate = z.infer<typeof ContentTemplateBodyCreateSchema>;
