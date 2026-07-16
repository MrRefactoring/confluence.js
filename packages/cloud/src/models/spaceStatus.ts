import { z } from 'zod';
/** The status of the space. */

export const SpaceStatusSchema = z.enum(['current', 'archived']);

export type SpaceStatus = z.infer<typeof SpaceStatusSchema>;
