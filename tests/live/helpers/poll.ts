/**
 * Exponential-backoff polling for eventually-consistent reads.
 *
 * Confluence Cloud is not read-your-write for every endpoint — a freshly created
 * page can take a moment to appear in a listing, a delete to propagate, a task to
 * finish. {@link waitFor} re-runs `fn` until `predicate` holds (or attempts run
 * out), so suites assert on settled state instead of racing the API.
 */
export interface PollOptions<T = unknown> {
  maxAttempts?: number;
  initialDelayMs?: number;
  factor?: number;
  describeLastValue?: (value: T | undefined) => string;
}

export async function waitFor<T>(
  fn: () => Promise<T>,
  predicate: (value: T) => boolean,
  options: PollOptions<T> = {},
): Promise<T> {
  const { maxAttempts = 6, initialDelayMs = 500, factor = 1.8, describeLastValue } = options;
  let delay = initialDelayMs;
  let last: T | undefined;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    last = await fn();

    if (predicate(last)) return last;

    if (attempt < maxAttempts - 1) {
      await new Promise<void>(resolve => setTimeout(resolve, delay));
      delay = Math.round(delay * factor);
    }
  }

  const details = describeLastValue ? `; last value: ${describeLastValue(last)}` : '';

  throw new Error(`waitFor: condition not satisfied after ${maxAttempts} attempts${details}`);
}
