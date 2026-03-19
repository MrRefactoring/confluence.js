/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-unnecessary-condition */
import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { getAuthenticationToken } from '~/services';
import type { Callback } from '~/callback';
import type { Client } from './client';
import { ConfigSchema, type Config, type Error as ConfluenceError } from '~/config';
import type { RequestConfig } from '~/requestConfig';
import { ZodError, z } from 'zod';

const ATLASSIAN_TOKEN_CHECK_FLAG = 'X-Atlassian-Token';
const ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE = 'no-check';
const WARNING_PREFIX = '\x1b[33m[confluence.js warning]\x1b[0m';
const NON_EMAIL_BASIC_AUTH_WARNING_TEXT =
  'authentication.basic.email is not a valid email address; treating it as login workaround.';
const NON_EMAIL_BASIC_AUTH_WARNING =
  `${WARNING_PREFIX} ${NON_EMAIL_BASIC_AUTH_WARNING_TEXT}`;
const EMAIL_SCHEMA = z.email();

export class BaseClient implements Client {
  #instance: AxiosInstance | undefined;

  constructor(protected readonly config: Config) {
    this.config.apiPrefix = this.config.apiPrefix || '/wiki/rest/';

    try {
      this.config = ConfigSchema.parse(this.config);
      this.warnIfNonEmailBasicAuthLogin();
    } catch (e) {
      if (e instanceof ZodError && e.issues[0]?.message) {
        throw new Error(e.issues[0].message, e);
      }

      throw e;
    }
  }

  private warnIfNonEmailBasicAuthLogin() {
    if (this.config.suppressWarnings) {
      return;
    }

    const authentication = this.config.authentication;

    if (!authentication || !('basic' in authentication)) {
      return;
    }

    if (!EMAIL_SCHEMA.safeParse(authentication.basic.email).success) {
      console.warn(NON_EMAIL_BASIC_AUTH_WARNING);
    }
  }

  protected paramSerializer(parameters: Record<string, any>): string {
    const parts: string[] = [];

    Object.entries(parameters).forEach(([key, value]) => {
      if (value === null || typeof value === 'undefined') {
        return;
      }

      if (Array.isArray(value)) {
        value = value.join(',');
      }

      if (value instanceof Date) {
        value = value.toISOString();
      } else if (value !== null && typeof value === 'object') {
        value = JSON.stringify(value);
      } else if (value instanceof Function) {
        const part = value();

        return part && parts.push(part);
      }

      parts.push(`${this.encode(key)}=${this.encode(value)}`);
    });

    return parts.join('&');
  }

  protected encode(value: string) {
    return encodeURIComponent(value)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }

  protected removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj)
      .filter(([, value]) => typeof value !== 'undefined')
      .reduce((accumulator, [key, value]) => ({ ...accumulator, [key]: value }), {});
  }

  private get instance() {
    if (this.#instance) {
      return this.#instance;
    }

    this.#instance = axios.create({
      paramsSerializer: this.paramSerializer.bind(this),
      ...this.config.baseRequestConfig,
      baseURL: `${this.config.host}${this.config.apiPrefix}`,
      headers: this.removeUndefinedProperties({
        [ATLASSIAN_TOKEN_CHECK_FLAG]: this.config.noCheckAtlassianToken
          ? ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE
          : undefined,
        ...this.config.baseRequestConfig?.headers,
      }),
    });

    return this.#instance;
  }

  async sendRequest<T>(requestConfig: RequestConfig, callback: never): Promise<T>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T>): Promise<void>;
  async sendRequest<T>(requestConfig: RequestConfig, callback: Callback<T> | never): Promise<void | T> {
    try {
      const modifiedRequestConfig = {
        ...requestConfig,
        headers: this.removeUndefinedProperties({
          Authorization: await getAuthenticationToken(this.config.authentication, {
            baseURL: this.config.host,
            url: this.instance.getUri(requestConfig),
            method: requestConfig.method!,
          }),
          ...requestConfig.headers,
        }),
      };

      const response = await this.instance.request<T>(modifiedRequestConfig);

      const callbackResponseHandler = callback && ((data: T): void => callback(null, data));
      const defaultResponseHandler = (data: T): T => data;

      const responseHandler = callbackResponseHandler ?? defaultResponseHandler;

      this.config.middlewares?.onResponse?.(response.data);

      return responseHandler(response.data);
    } catch (e: any) {
      const err = e.isAxiosError ? e.response.data : e;

      const callbackErrorHandler = callback && ((error: ConfluenceError) => callback(error));
      const defaultErrorHandler = (error: Error) => {
        throw error;
      };

      const errorHandler = callbackErrorHandler ?? defaultErrorHandler;

      this.config.middlewares?.onError?.(err);

      return errorHandler(err);
    }
  }
}
