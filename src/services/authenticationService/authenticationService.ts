import { Config } from '../../config';
import {
  createBasicAuthenticationToken,
  createJWTAuthentication,
  createOAuth2AuthenticationToken,
  createPATAuthenticationToken,
} from './authentications';

export namespace AuthenticationService {
  export async function getAuthenticationToken(
    authentication: Config.Authentication | undefined,
    requestData?: {
      baseURL: string;
      url: string;
      method: string;
    },
  ): Promise<string | undefined> {
    if (!authentication) {
      return undefined;
    }

    if (authentication.basic) {
      return createBasicAuthenticationToken(authentication.basic);
    }

    if (authentication.oauth2) {
      return createOAuth2AuthenticationToken(authentication.oauth2);
    }

    if (authentication.jwt) {
      return createJWTAuthentication(authentication.jwt, requestData!);
    }

    if (authentication.personalAccessToken) {
      return createPATAuthenticationToken(authentication.personalAccessToken);
    }

    return undefined;
  }
}
