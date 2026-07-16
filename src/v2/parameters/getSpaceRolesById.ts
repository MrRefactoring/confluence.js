import { z } from 'zod';

export const GetSpaceRolesByIdSchema = z.object({
  /** The ID of the space role to retrieve. */
  id: z.number(),
});

export type GetSpaceRolesById = z.input<typeof GetSpaceRolesByIdSchema>;
