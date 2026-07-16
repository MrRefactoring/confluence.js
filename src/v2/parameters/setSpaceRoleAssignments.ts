import { z } from 'zod';

export const SetSpaceRoleAssignmentsSchema = z.object({
  /** The ID of the space for which to retrieve assignments. */
  id: z.number(),
  body: z.record(z.string(), z.any()).optional(),
});

export type SetSpaceRoleAssignments = z.input<typeof SetSpaceRoleAssignmentsSchema>;
