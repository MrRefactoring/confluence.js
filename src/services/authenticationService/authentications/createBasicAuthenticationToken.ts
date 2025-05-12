import { Base64Encoder } from '../base64Encoder';
import type { Basic } from '~';

export function createBasicAuthenticationToken({ basic: { email, apiToken } }: Basic) {
  const token = Base64Encoder.encode(`${email}:${apiToken}`);

  return `Basic ${token}`;
}
