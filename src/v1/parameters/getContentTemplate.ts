import { z } from 'zod';
import { openEnum } from '#/core';

export const GetContentTemplateSchema = z.object({
  /** The ID of the content template to be returned. */
  contentTemplateId: z.string(),
  /**
   * A multi-value parameter indicating which properties of the template to expand.
   *
   * - `body` or `body.storage` returns the content of the template in storage format.
   */
  expand: z.array(openEnum(['body', 'body.storage'])).optional(),
});

export type GetContentTemplate = z.input<typeof GetContentTemplateSchema>;
