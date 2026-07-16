import { Base64Encoder } from '../base64Encoder.js';
import type { Basic } from '../../../index.js';

export function createBasicAuthenticationToken({ basic: { email, apiToken } }: Basic) {
  const token = Base64Encoder.encode(`${email}:${apiToken}`);

  return `Basic ${token}`;
}
