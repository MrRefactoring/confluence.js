import { z } from 'zod';
import { apiObject } from '@confluence.js/core';

export const AccessByEmailSchema = apiObject({
  /** List of emails that do not have access to site. */
  emailsWithoutAccess: z.array(z.string()).optional(),
  /** List of invalid emails provided in the request. */
  invalidEmails: z.array(z.string()).optional(),
});

export type AccessByEmail = z.infer<typeof AccessByEmailSchema>;
