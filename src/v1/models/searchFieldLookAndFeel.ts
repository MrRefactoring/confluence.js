import { z } from 'zod';
import { apiObject } from '#/core';

export const SearchFieldLookAndFeelSchema = apiObject({
  backgroundColor: z.string(),
  color: z.string(),
});

export type SearchFieldLookAndFeel = z.infer<typeof SearchFieldLookAndFeelSchema>;
