import { z } from 'zod';

export const RegisterModulesSchema = z.object({
  body: z.record(z.string(), z.any()),
});

export type RegisterModules = z.input<typeof RegisterModulesSchema>;
