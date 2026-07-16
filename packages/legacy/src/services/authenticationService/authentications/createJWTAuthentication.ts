import * as jwt from '@atlassian/atlassian-jwt';
import type { JWT } from '../../../index.js';

export function createJWTAuthentication(
  { jwt: { issuer, secret, expiryTimeSeconds } }: JWT,
  requestData: {
    method: string;
    url: string;
  },
) {
  const { method, url } = requestData;

  const now = Math.floor(Date.now() / 1000);
  const expire = now + (expiryTimeSeconds ?? 180);

  const request = jwt.fromMethodAndUrl(method, url);
  const tokenData = {
    iss: issuer,
    qsh: jwt.createQueryStringHash(request),
    iat: now,
    exp: expire,
  };

  const token = jwt.encodeSymmetric(tokenData, secret);

  return `JWT ${token}`;
}
