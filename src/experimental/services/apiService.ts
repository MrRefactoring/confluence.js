import { type Config, ConfigSchema } from '~/experimental/schemas/config';
import type { Request } from '~/experimental/interfaces';
import { stringToBase64 } from '~/experimental/services/stringToBase64';

export class ApiService {
  readonly #authorization: string | undefined;
  private readonly baseUrl: URL;

  constructor(private config: Config) {
    this.config = ConfigSchema.parse(config);
    this.baseUrl = new URL('wiki/api/v2/', config.host);

    if (this.config.authorization) {
      const { email, apiToken } = this.config.authorization;

      this.#authorization = stringToBase64(`${email}:${apiToken}`);

      delete this.config.authorization;
    }
  }

  async sendRequest<T, R>(request: Request<R>): Promise<T> {
    const url = new URL(request.url.replace(/^\//, ''), this.baseUrl);
    const headers = { ...request.headers };

    if (request.query) {
      Object.entries(request.query).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }

    if (this.#authorization) {
      headers.Authorization = `Basic ${this.#authorization}`;
    }

    const response = await fetch(url, {
      method: request.method,
      headers,
      body: request.body ? JSON.stringify(request.body) : null,
    });

    const contentType = response.headers.get('Content-Type');

    if (!response.ok) {
      const cause = await (contentType?.includes('application/json') ? response.json() : response.text());
      throw new Error(response.statusText, cause);
    }

    if (contentType?.includes('application/json')) {
      return await response.json();
    }

    return response as unknown as T;
  }
}
