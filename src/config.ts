import { AxiosError } from 'axios';
import type { RequestConfig } from './requestConfig';
import type { UtilityTypes } from './utilityTypes';

export interface Config {
  host: string;
  baseRequestConfig?: Config.BaseRequestConfig;
  authentication?: Config.Authentication;
  middlewares?: Config.Middlewares;
  /** @deprecated Disabled. Will be removed in the next major version. */
  telemetry?: Config.Telemetry;
  /** Adds `'X-Atlassian-Token': 'no-check'` to each request header */
  noCheckAtlassianToken?: boolean;
  /** Enable new API error handling. `false` by default. */
  newErrorHandling?: boolean;
}

export namespace Config {
  export type BaseRequestConfig = RequestConfig;
  export type Error = AxiosError;
  /** @deprecated Disabled. Will be removed in the next major version. */
  export type Telemetry = boolean | any;

  export type Authentication = UtilityTypes.XOR4<
  {
    jwt: Authentication.JWT;
  },
  {
    personalAccessToken: Authentication.PersonalAccessToken;
  },
  {
    basic: Authentication.Basic;
  },
  {
    oauth2: Authentication.OAuth2;
  }
  >;

  export interface Middlewares {
    onError?: Config.Middlewares.OnErrorHandler;
    onResponse?: Config.Middlewares.OnResponseHandler;
  }

  export namespace Middlewares {
    export type OnErrorHandler = (error: Config.Error) => void;
    export type OnResponseHandler = (data: any) => void;
  }

  export namespace Authentication {
    export type PersonalAccessToken = string;

    export type JWT = {
      /** The key from the app descriptor. */
      issuer: string;
      /** The shared secret key received during the app installation handshake */
      secret: string;
      /** Token expiry time (default 3 minutes after issuing) */
      expiryTimeSeconds?: number;
    };

    export type Basic = UtilityTypes.XOR<
    {
      email: string;
      apiToken: string;
    },
    {
      username: string;
      password: string;
    }
    >;

    export type OAuth2 = {
      accessToken: string;
    };
  }
}
