import { ApiError } from '#/core';

/**
 * True when the site refused because of the plan it is on, not because of the request.
 *
 * Space permission writes, page restrictions and archiving are all Standard-and-above features. A Free Edition tenant
 * answers each of them with a refusal that names the entitlement rather than anything the caller did — a 403 saying
 * the user "isn't authorized ... because they are using the Free Edition", a 403 refusing to alter content
 * restrictions, or a 400 saying the tenant "is not entitled to archiving".
 *
 * None of that is drift and none of it is breakage: the endpoints are correct and the library reaches them. Treated as
 * a failure, a lapsed trial turns the nightly audit red for days and buries the signal it exists to carry, so the
 * suites that need those features check this and stand down instead.
 */
export function isNotEntitled(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;

  const body = JSON.stringify(error.body ?? '');

  return (
    body.includes('Free Edition')
    || body.includes('not entitled to')
    || body.includes('Not enough permissions to alter ContentRestrictions')
  );
}

/**
 * The call's result, or `undefined` when the site's plan does not include what it asks for.
 *
 * Every other failure is rethrown, so a test that stands down on a Free Edition tenant still fails on a real one.
 */
export async function unlessNotEntitled<T>(call: Promise<T>): Promise<T | undefined> {
  return call.catch((error: unknown) => {
    if (isNotEntitled(error)) return undefined;

    throw error;
  });
}
