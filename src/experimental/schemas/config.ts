import { z } from 'zod';

export const ConfigSchema = z.strictObject({
  host: z.string().url(),
  authorization: z.strictObject({
    email: z.string().email(),
    apiToken: z.string(),
  }).optional(),
});

export type Config = z.infer<typeof ConfigSchema>;
