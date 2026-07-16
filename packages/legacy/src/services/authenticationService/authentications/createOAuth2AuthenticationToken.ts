import type { OAuth2 } from '../../../index.js';

export function createOAuth2AuthenticationToken({ oauth2: { accessToken } }: OAuth2) {
  return `Bearer ${accessToken}`;
}
