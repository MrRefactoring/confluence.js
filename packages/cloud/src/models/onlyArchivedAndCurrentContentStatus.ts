import { z } from 'zod';
/** The status of the content. */

export const OnlyArchivedAndCurrentContentStatusSchema = z.enum(['current', 'archived']);

export type OnlyArchivedAndCurrentContentStatus = z.infer<typeof OnlyArchivedAndCurrentContentStatusSchema>;
