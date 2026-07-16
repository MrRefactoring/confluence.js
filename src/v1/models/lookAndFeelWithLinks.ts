import type { z } from 'zod';
import { apiObject } from '#/core';
/** Look and feel settings returned after an update. */

export const LookAndFeelWithLinksSchema = apiObject({});

export type LookAndFeelWithLinks = z.infer<typeof LookAndFeelWithLinksSchema>;
