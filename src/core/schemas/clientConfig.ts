import { z } from 'zod';
import { authSchema } from './auth.js';

export const transientRetrySchema = z.object({
  /** Total number of attempts including the first. Default: 1 (no retries). */
  maxAttempts: z.number().int().positive().optional(),
  /** Delay before the first retry in ms. Default: 500. */
  initialDelayMs: z.number().int().nonnegative().optional(),
  /** Exponential backoff multiplier. Default: 2. */
  backoffFactor: z.number().positive().optional(),
});

export type TransientRetryConfig = z.infer<typeof transientRetrySchema>;

export const clientConfigSchema = z.object({
  host: z.url(),
  auth: authSchema.optional(),
  headers: z.record(z.string(), z.string()).optional(),
  getAuthOn401: z.custom<() => Promise<z.infer<typeof authSchema>>>(val => typeof val === 'function').optional(),
  /**
   * Opt-in retry for transient transport failures only — network errors (ECONNRESET, ETIMEDOUT, ENOTFOUND, EAI_AGAIN,
   * EPIPE, UND_ERR_SOCKET, ERR_SSL_*) and HTTP 502/503/504. Never retries 4xx (including 401, 429) or 5xx other than
   * 502/503/504 — those signal client or server logic and masking them would hide real regressions. Disabled by
   * default.
   */
  retry: transientRetrySchema.optional(),
});

export type ClientConfig = z.infer<typeof clientConfigSchema>;
