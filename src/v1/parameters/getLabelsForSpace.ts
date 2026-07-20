import { z } from 'zod';

export const GetLabelsForSpaceSchema = z.object({
  /** The key of the space to get labels for. */
  spaceKey: z.string(),
  /**
   * Filters the results to labels with the specified prefix. If this parameter is not specified, then labels with any
   * prefix will be returned.
   *
   * - `global` prefix is used by labels that are on content within the provided space.
   * - `my` prefix can be explicitly added by a user when adding a label via the UI, e.g. 'my:example-label'.
   * - `team` prefix is used for labels applied to the space.
   */
  prefix: z.enum(['global', 'my', 'team']).optional(),
  /** The starting index of the returned labels. */
  start: z.number().optional(),
  /** The maximum number of labels to return per page. Note, this may be restricted by fixed system limits. */
  limit: z.number().optional(),
});

export type GetLabelsForSpace = z.input<typeof GetLabelsForSpaceSchema>;
