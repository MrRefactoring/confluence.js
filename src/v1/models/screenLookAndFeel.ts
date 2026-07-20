import { z } from 'zod';
import { apiObject } from '#/core';

export const ScreenLookAndFeelSchema = apiObject({
  background: z.string(),
  backgroundAttachment: z.string().nullish(),
  backgroundBlendMode: z.string().nullish(),
  backgroundClip: z.string().nullish(),
  backgroundColor: z.string().nullish(),
  backgroundImage: z.string().nullish(),
  backgroundOrigin: z.string().nullish(),
  backgroundPosition: z.string().nullish(),
  backgroundRepeat: z.string().nullish(),
  backgroundSize: z.string().nullish(),
  layer: apiObject({
    width: z.string().optional(),
    height: z.string().optional(),
  }).nullish(),
  gutterTop: z.string().nullish(),
  gutterRight: z.string().nullish(),
  gutterBottom: z.string().nullish(),
  gutterLeft: z.string().nullish(),
});

export type ScreenLookAndFeel = z.infer<typeof ScreenLookAndFeelSchema>;
