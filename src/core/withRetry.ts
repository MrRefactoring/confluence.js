import { ApiError } from './apiError.js';

const RETRYABLE_STATUS_CODES = new Set([429, 502, 503, 504]);

export interface RetryOptions {
  /** Total number of attempts including the first. Default: 3. */
  maxAttempts?: number;
  /** Delay before the first retry in milliseconds. Default: 1000. */
  initialDelayMs?: number;
  /** Exponential backoff multiplier. Default: 2. */
  backoffFactor?: number;
}

/**
 * Wraps an async operation with automatic retry on retriable HTTP errors.
 *
 * Retries only an {@link ApiError} carrying 429, 502, 503 or 504 — a rate limit or a gateway. Anything else is rethrown
 * on the first attempt: 401, 403, 404 and 500 all describe the request, and a plain `Error` from the operation is not
 * an HTTP answer at all. It is therefore a rate-limit helper, not a poller — to wait on eventually-consistent state,
 * loop on the value rather than on a thrown error.
 *
 * @example
 *   ```typescript
 *   const page = await withRetry(
 *     () => confluence.page.getPageById({ id: 12345 }),
 *     { maxAttempts: 4, initialDelayMs: 500 },
 *   );
 *   ```;
 *
 * @stable
 */
export async function withRetry<T>(operation: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const { maxAttempts = 3, initialDelayMs = 1000, backoffFactor = 2 } = options;
  let lastError: unknown;
  let delayMs = initialDelayMs;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      lastError = err;

      const isRetryable = err instanceof ApiError && RETRYABLE_STATUS_CODES.has(err.status);

      if (!isRetryable || attempt === maxAttempts) {
        throw err;
      }

      await new Promise<void>(resolve => setTimeout(resolve, delayMs));
      delayMs = Math.round(delayMs * backoffFactor);
    }
  }

  throw lastError;
}
