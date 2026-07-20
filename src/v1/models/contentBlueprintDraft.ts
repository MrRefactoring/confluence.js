import { z } from 'zod';
import { apiObject } from '#/core';

export const ContentBlueprintDraftSchema = apiObject({
  /** The version for the new content. */
  version: apiObject({
    /** The version number. Set this to `1`. */
    number: z.number(),
  }),
  /** The title of the content. If you don't want to change the title, set this to the current title of the draft. */
  title: z.string().max(255, 'title must be at most 255 characters'),
  /** The type of content. Set this to `page`. */
  type: z.enum(['page']),
  /** The status of the content. Set this to `current` or omit it altogether. */
  status: z.enum(['current']).optional(),
  /** The space for the content. */
  space: apiObject({
    /** The key of the space */
    key: z.string(),
  }).optional(),
  /**
   * The new ancestor (i.e. parent page) for the content. If you have specified an ancestor, you must also specify a
   * `space` property in the request body for the space that the ancestor is in.
   *
   * Note, if you specify more than one ancestor, the last ID in the array will be selected as the parent page for the
   * content.
   */
  ancestors: z
    .array(
      apiObject({
        /** The content ID of the ancestor. */
        id: z.string(),
      }),
    )
    .nullish(),
});

export type ContentBlueprintDraft = z.infer<typeof ContentBlueprintDraftSchema>;
