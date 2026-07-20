import { z } from 'zod';
import { apiObject } from '#/core';

export const ContainerLookAndFeelSchema = apiObject({
  background: z.string(),
  backgroundAttachment: z.string().nullish(),
  backgroundBlendMode: z.string().nullish(),
  backgroundClip: z.string().nullish(),
  backgroundColor: z.string().nullable(),
  backgroundImage: z.string().nullable(),
  backgroundOrigin: z.string().nullish(),
  backgroundPosition: z.string().nullish(),
  backgroundRepeat: z.string().nullish(),
  backgroundSize: z.string().nullable(),
  padding: z.string(),
  borderRadius: z.string(),
});

export type ContainerLookAndFeel = z.infer<typeof ContainerLookAndFeelSchema>;
