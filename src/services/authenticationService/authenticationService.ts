import type { Authentication } from '~/config';
import {
  createBasicAuthenticationToken,
  createJWTAuthentication,
  createOAuth2AuthenticationToken,
} from './authentications';

export async function getAuthenticationToken(
  authentication: Authentication | undefined,
  requestData?: {
    baseURL: string;
    url: string;
    method: string;
  },
): Promise<string | undefined> {
  if (!authentication) {
    return undefined;
  }

  if ('basic' in authentication) {
    return createBasicAuthenticationToken(authentication);
  }

  if ('oauth2' in authentication) {
    return createOAuth2AuthenticationToken(authentication);
  }

  if ('jwt' in authentication) {
    return createJWTAuthentication(authentication, requestData!);
  }

  return undefined;
}
