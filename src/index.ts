/**
 * Confluence REST API client for Node.js and browsers.
 *
 * Both API versions are first-class: Atlassian has not deprecated v1, and the two cover different ground. Each has its
 * own factory, and both take the same bare site URL — the API path is part of the request, not of `host`:
 *
 * ```ts
 * import { createV2Client } from 'confluence.js';
 *
 * const confluence = createV2Client({
 *   host: 'https://your-domain.atlassian.net',
 *   auth: { type: 'basic', email, apiToken },
 * });
 *
 * await confluence.page.getPages({ spaceId: [123] });
 * ```
 *
 * For a smaller bundle, import the flat functions from `confluence.js/v1` or `confluence.js/v2` and drive them with a
 * single client from `confluence.js/core` — one client serves both versions.
 *
 * `confluence.js/v1` and `confluence.js/v2` also expose every request parameter and response type. They are not
 * re-exported here: the two versions collide on a handful of names (`createSpace`, `getTasks`).
 */

export { createV1Client, type V1Client } from './v1/createV1Client.js';

export { createV2Client, type V2Client } from './v2/createV2Client.js';

export {
  ApiError,
  AuthError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
  ScopeError,
  ServerError,
  NetworkError,
  OAuthError,
  ConfigError,
  SchemaMismatchError,
  isApiError,
  isAuthError,
  isForbiddenError,
  isNotFoundError,
  isRateLimitError,
  isServerError,
  isNetworkError,
  isOAuthError,
  isConfigError,
  isSchemaMismatchError,
  isReauthorizationRequired,
  isScopeError,
} from './core/index.js';

export type { Auth, ClientConfig } from './core/index.js';

export {
  generateAuthorizationUrl,
  exchangeAuthorizationCode,
  refreshOAuth2Token,
  getAccessibleResources,
  parseCallbackUrl,
} from './core/index.js';

export type {
  OAuth2TokenResponse,
  AccessibleResource,
  TokenRefreshEvent,
  OnTokenRefresh,
  CallbackParams,
} from './core/index.js';
