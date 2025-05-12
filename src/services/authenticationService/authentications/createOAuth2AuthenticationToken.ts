import type { OAuth2 } from '~';

export function createOAuth2AuthenticationToken({ oauth2: { accessToken } }: OAuth2) {
  return `Bearer ${accessToken}`;
}
