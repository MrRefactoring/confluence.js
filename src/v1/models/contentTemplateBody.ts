import type { z } from 'zod';
import { apiObject } from '#/core';
import { ContentBodySchema } from './contentBody';
/**
 * The body of the new content. Does not apply to attachments.* Only one body format should be specified as the property
 * for* this object, e.g. `storage`.*
 *
 * Note, `editor2` format is used by Atlassian only. `anonymous_export_view` is* the same as `export_view` format but
 * only content viewable by an anonymous* user is included.
 */

export const ContentTemplateBodySchema = apiObject({
  view: ContentBodySchema.optional(),
  export_view: ContentBodySchema.optional(),
  styled_view: ContentBodySchema.optional(),
  storage: ContentBodySchema.optional(),
  editor: ContentBodySchema.optional(),
  editor2: ContentBodySchema.optional(),
  wiki: ContentBodySchema.optional(),
  atlas_doc_format: ContentBodySchema.optional(),
  anonymous_export_view: ContentBodySchema.optional(),
});

export type ContentTemplateBody = z.infer<typeof ContentTemplateBodySchema>;
