import { describe, it, expect } from 'vitest';
import { BaseClient } from '~/clients/baseClient';
import type { Config } from '~/config';

describe('BaseClient', () => {
  describe('constructor', () => {
    it('should set default apiPrefix if not provided', () => {
      const config: Config = { host: 'https://example.com' };

      new BaseClient(config);

      expect(config.apiPrefix).toBe('/wiki/rest/');
    });

    it('should keep provided apiPrefix if specified', () => {
      const config: Config = {
        host: 'https://example.com',
        apiPrefix: '/custom/api/',
      };

      new BaseClient(config);

      expect(config.apiPrefix).toBe('/custom/api/');
    });

    it('should throw ZodError when config validation fails', () => {
      const config = {
        host: 'invalid-url', // Invalid URL should fail validation
        apiPrefix: '/wiki/rest/',
      };

      expect(() => new BaseClient(config)).toThrowError('Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?');
    });
  });
});
