import { z } from 'zod';

export const DeleteSpaceRoleSchema = z.object({
  /** Id of the space role */
  id: z.string(),
});

export type DeleteSpaceRole = z.input<typeof DeleteSpaceRoleSchema>;
