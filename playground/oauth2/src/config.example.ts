/**
 * Copy this file to `config.ts` and fill it in:
 *
 *   cp src/config.example.ts src/config.ts
 *
 * `config.ts` is gitignored, so your real credentials stay out of git.
 */
export const config = {
  /** Client ID of the OAuth 2.0 (3LO) app from the developer console. */
  clientId: '',

  /** Client secret. Server-side only — never ship it to a browser, never commit it. */
  clientSecret: '',

  /**
   * Scopes to request.
   *
   * `offline_access` is what gets you a refresh token; without it the grant dies in an hour and there is no refresh to
   * watch.
   *
   * The rest come from both families, because this playground calls both API versions: granular scopes
   * (`read:page:confluence`) serve v2, classic ones (`read:confluence-content.all`) serve v1. They combine in one
   * grant, and if you use both versions they have to.
   *
   * Scopes are per endpoint, not per version — asking for the family is not enough, you need the specific scope the
   * operation names in its API documentation.
   */
  scopes: ['offline_access', 'read:page:confluence', 'read:space:confluence', 'read:confluence-content.all'],

  /**
   * Port for the local callback server, giving a redirect URI of `http://localhost:<port>/callback`.
   *
   * Register that exact URL in the console under Authorization → Callback URL, or consent will fail.
   */
  port: 3000,
};

if (!config.clientId || !config.clientSecret) {
  throw new Error('Fill in clientId and clientSecret in src/config.ts (copy it from src/config.example.ts).');
}
