import { z } from 'zod';
import type { AxiosError } from 'axios';

/**
 * Basic authentication configuration using email and API token
 *
 * @see {@link https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/} for how to create API tokens
 */
export const BasicSchema = z.strictObject({
  basic: z.strictObject({
    /** User's email associated with Atlassian account */
    email: z.string().email(),
    /**
     * API token generated from Atlassian account settings
     *
     * @see {@link https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/} for how to create API tokens
     */
    apiToken: z.string().min(1, 'API token is required'),
  }),
});

/** JWT authentication configuration */
export const JWTSchema = z.strictObject({
  jwt: z.strictObject({
    /** The key from the app descriptor */
    issuer: z.string(),
    /** The shared secret key from app installation */
    secret: z.string(),
    /** Token expiry time (default: 180) */
    expiryTimeSeconds: z.optional(z.number()),
  }),
});

/** OAuth2 authentication configuration */
export const OAuth2Schema = z.strictObject({
  oauth2: z.strictObject({
    /** OAuth2 access token */
    accessToken: z.string(),
  }),
});

/** Authentication configuration schema */
export const AuthenticationSchema = z.union([BasicSchema, JWTSchema, OAuth2Schema]);

/** Base request configuration */
export const RequestConfigSchema = z.any();

/** Middleware configuration schema */
export const MiddlewaresSchema = z.object({
  /** Error handler middleware */
  onError: z.optional(z.function().args(z.any()).returns(z.void())),
  /** Response handler middleware */
  onResponse: z.optional(z.function().args(z.any()).returns(z.void())),
});

export const ConfigSchema = z.object({
  host: z.string().url({ message:  'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?' }),
  baseRequestConfig: z.optional(RequestConfigSchema),
  authentication: z.optional(AuthenticationSchema),
  middlewares: z.optional(MiddlewaresSchema),
  /** Adds `'X-Atlassian-Token': 'no-check'` to each request header */
  noCheckAtlassianToken: z.optional(z.boolean()),
  /** Prefix for all API routes. */
  apiPrefix: z.optional(z.string()),
});

export type Config = z.infer<typeof ConfigSchema>;
export type Authentication = z.infer<typeof AuthenticationSchema>;
export type Basic = z.infer<typeof BasicSchema>;
export type JWT = z.infer<typeof JWTSchema>;
export type OAuth2 = z.infer<typeof OAuth2Schema>;
export type Error = AxiosError;
