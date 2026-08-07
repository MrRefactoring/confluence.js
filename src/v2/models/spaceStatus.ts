import type { z } from 'zod';
import { openEnum } from '#/core';
/** The status of the space. */

export const SpaceStatusSchema = openEnum(['current', 'archived']);

export type SpaceStatus = z.infer<typeof SpaceStatusSchema>;
