import type { z } from 'zod';
import { openEnum } from '#/core';
/** The status of the content. */

export const OnlyArchivedAndCurrentContentStatusSchema = openEnum(['current', 'archived']);

export type OnlyArchivedAndCurrentContentStatus = z.infer<typeof OnlyArchivedAndCurrentContentStatusSchema>;
