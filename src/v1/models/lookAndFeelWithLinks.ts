import type { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';
import { LookAndFeelSchema } from './lookAndFeel';

/** Look and feel settings returned after an update. */
export const LookAndFeelWithLinksSchema = apiObject(LookAndFeelSchema.shape).extend({
  _links: GenericLinksSchema.optional(),
});

export type LookAndFeelWithLinks = z.infer<typeof LookAndFeelWithLinksSchema>;
