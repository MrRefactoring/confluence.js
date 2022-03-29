import { Config } from '../../../config';

export async function createPATAuthenticationToken(authenticationData: Config.Authentication.PersonalAccessToken) {
  return `Bearer ${authenticationData}`;
}
