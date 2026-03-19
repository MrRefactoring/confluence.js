import { describe, it, expect, vi } from 'vitest';
import { BaseClient } from '~/clients/baseClient';
import { ConfigSchema, type Config } from '~/config';
import { ZodError } from 'zod';

describe('BaseClient', () => {
  const nonEmailWarningText =
    'authentication.basic.email is not a valid email address; treating it as login workaround.';
  const highlightedNonEmailWarningMessage =
    `\x1b[33m[confluence.js warning]\x1b[0m ${nonEmailWarningText}`;

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

    it('should throw friendly error when host URL is invalid', () => {
      const config = {
        host: 'invalid-url', // Invalid URL should fail validation
        apiPrefix: '/wiki/rest/',
      };

      expect(() => new BaseClient(config)).toThrowError('Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?');
    });

    it('should throw readable error message for zod validation failure issue', () => {
      const parseMock = vi.spyOn(ConfigSchema, 'parse').mockImplementation(() => {
        throw new ZodError([
          {
            code: 'invalid_format',
            format: 'url',
            path: ['host'],
            message:
              'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?',
          } as never,
        ]);
      });

      expect(() => new BaseClient({ host: 'https://example.com' })).toThrowError(
        'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?',
      );

      parseMock.mockRestore();
    });

    it('should allow non-email basic authentication value', () => {
      expect(() => new BaseClient({
        host: 'https://example.com',
        authentication: {
          basic: {
            email: 'server-login',
            apiToken: 'token',
          },
        },
      })).not.toThrow();
    });

    it('should warn when non-email value is provided and suppressWarnings is false', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

      new BaseClient({
        host: 'https://example.com',
        authentication: {
          basic: {
            email: 'server-login',
            apiToken: 'token',
          },
        },
      });

      expect(warnSpy).toHaveBeenCalledWith(highlightedNonEmailWarningMessage);

      warnSpy.mockRestore();
    });

    it('should not warn when non-email value is provided and suppressWarnings is true', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

      new BaseClient({
        host: 'https://example.com',
        suppressWarnings: true,
        authentication: {
          basic: {
            email: 'server-login',
            apiToken: 'token',
          },
        },
      });

      expect(warnSpy).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    it('should print highlighted warning prefix when non-email login is provided', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

      new BaseClient({
        host: 'https://example.com',
        authentication: {
          basic: {
            email: 'server-login',
            apiToken: 'token',
          },
        },
      });

      expect(warnSpy).toHaveBeenCalledWith(highlightedNonEmailWarningMessage);

      warnSpy.mockRestore();
    });
  });

  describe('config schema middleware handlers', () => {
    it('should accept middleware handlers as functions', () => {
      const parseResult = ConfigSchema.safeParse({
        host: 'https://example.com',
        middlewares: {
          onError: () => undefined,
          onResponse: () => undefined,
        },
      });

      expect(parseResult.success).toBe(true);
    });
  });
});
