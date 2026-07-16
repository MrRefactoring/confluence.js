import { z } from 'zod';

export const ListSpacePermissionCombinationsSchema = z.object({
  /** Opaque cursor returned from a previous page in the `cursor` field of the response. Omit for the first page. */
  cursor: z.string().optional(),
  /** The maximum number of combinations to return per page. Requests outside the supported range return `400`. */
  limit: z.number().optional(),
});

export type ListSpacePermissionCombinations = z.input<typeof ListSpacePermissionCombinationsSchema>;
