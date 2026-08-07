import { z } from 'zod';
import { openEnum } from '#/core';

export const GetContentTemplatesSchema = z.object({
  /**
   * The key of the space to be queried for templates. If the `spaceKey` is not specified, global templates will be
   * returned.
   */
  spaceKey: z.string().optional(),
  /** The starting index of the returned templates. */
  start: z.number().optional(),
  /** The maximum number of templates to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
  /**
   * A multi-value parameter indicating which properties of the template to expand.
   *
   * - `body` or `body.storage` returns the content of the template in storage format.
   */
  expand: z.array(openEnum(['body', 'body.storage'])).optional(),
});

export type GetContentTemplates = z.input<typeof GetContentTemplatesSchema>;
