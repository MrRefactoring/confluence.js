import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Space {
  constructor(private client: Client) {}

  /**
   * Returns information about a number of spaces.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space?spaceKey=TST&spaceKey=ds
   */
  async spaces<T = unknown>(parameters: Parameters.Spaces | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns information about a number of spaces.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space?spaceKey=TST&spaceKey=ds
   */
  async spaces<T = unknown>(parameters?: Parameters.Spaces, callback?: never): Promise<T>;
  async spaces<T = unknown>(parameters?: Parameters.Spaces, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/space',
      method: 'GET',
      params: {
        spaceKey: parameters?.spaceKey,
        type: parameters?.type,
        status: parameters?.status,
        label: parameters?.label,
        favourite: parameters?.favourite,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'spaces' });
  }

  /**
   * Creates a new Space.
   *
   *                                  The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createSpace<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Creates a new Space.
   *
   *                                  The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createSpace<T = unknown>(callback?: never): Promise<T>;
  async createSpace<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/space',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'createSpace' });
  }

  /**
   * Creates a new private Space, viewable only by its creator.
   *
   *                                  The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createPrivateSpace<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Creates a new private Space, viewable only by its creator.
   *
   *                                  The incoming Space does not include an id, but must include a Key and Name, and should include a Description.
   */
  async createPrivateSpace<T = unknown>(callback?: never): Promise<T>;
  async createPrivateSpace<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/space/_private',
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'createPrivateSpace' });
  }

  /**
   * Returns information about a space.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space/TST?expand=description
   */
  async space<T = unknown>(parameters: Parameters.Space | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns information about a space.
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space/TST?expand=description
   */
  async space<T = unknown>(parameters?: Parameters.Space, callback?: never): Promise<T>;
  async space<T = unknown>(parameters?: Parameters.Space, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'space' });
  }

  /** Updates a Space. Currently only the Space name, description and homepage can be updated. */
  async update<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Updates a Space. Currently only the Space name, description and homepage can be updated. */
  async update<T = unknown>(callback?: never): Promise<T>;
  async update<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'update' });
  }

  /**
   * Deletes a Space.
   *
   *                                  The space is deleted in a long running task, so the space cannot be considered deleted when
   *                              this resource returns. Clients can follow the status link in the response and poll
   *                              it until the task completes.
   *                              Responses
   */
  async delete<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Deletes a Space.
   *
   *                                  The space is deleted in a long running task, so the space cannot be considered deleted when
   *                              this resource returns. Clients can follow the status link in the response and poll
   *                              it until the task completes.
   *                              Responses
   */
  async delete<T = unknown>(callback?: never): Promise<T>;
  async delete<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'delete' });
  }

  /**
   * Returns the content in this given space
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space/TEST/content?expand=history
   */
  async contents<T = unknown>(parameters: Parameters.Contents | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns the content in this given space
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space/TEST/content?expand=history
   */
  async contents<T = unknown>(parameters?: Parameters.Contents, callback?: never): Promise<T>;
  async contents<T = unknown>(parameters?: Parameters.Contents, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/content`,
      method: 'GET',
      params: {
        depth: parameters?.depth,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'contents' });
  }

  /**
   * Returns the content in this given space with the given type
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space/TEST/content/page?expand=history
   */
  async contentsWithType<T = unknown>(
    parameters: Parameters.ContentsWithType | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the content in this given space with the given type
   *
   *                                  Example request URI(s):
   *
   *                              http://example.com/rest/api/space/TEST/content/page?expand=history
   */
  async contentsWithType<T = unknown>(parameters?: Parameters.ContentsWithType, callback?: never): Promise<T>;
  async contentsWithType<T = unknown>(
    parameters?: Parameters.ContentsWithType,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/content/${parameters.type}`,
      method: 'GET',
      params: {
        depth: parameters?.depth,
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'contentsWithType' });
  }

  /**
   * Returns a paginated list of space properties.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/experimental/space/TST/property?expand=space,version
   */
  async get<T = unknown>(parameters: Parameters.Get | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a paginated list of space properties.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/experimental/space/TST/property?expand=space,version
   */
  async get<T = unknown>(parameters?: Parameters.Get, callback?: never): Promise<T>;
  async get<T = unknown>(parameters?: Parameters.Get, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/property`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
        start: parameters?.start,
        limit: parameters?.limit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'get' });
  }

  /** Creates a new space property. */
  async create<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Creates a new space property. */
  async create<T = unknown>(callback?: never): Promise<T>;
  async create<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/property`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'create' });
  }

  /**
   * Returns a paginated list of space properties.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/experimental/space/TST/property?expand=space,version
   */
  async get<T = unknown>(parameters: Parameters.Get | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a paginated list of space properties.
   *
   *                                  Example request URI:
   *
   *                              http://example.com/rest/experimental/space/TST/property?expand=space,version
   */
  async get<T = unknown>(parameters?: Parameters.Get, callback?: never): Promise<T>;
  async get<T = unknown>(parameters?: Parameters.Get, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'get' });
  }

  /** Creates a new space property. */
  async create<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Creates a new space property. */
  async create<T = unknown>(callback?: never): Promise<T>;
  async create<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'create' });
  }

  /**
   * Updates a space property. The body contains the representation of the space property. Must include new version
   * number. If the given version number is 1, attempts to create a new space property, just like
   * {@link #create(String, com.atlassian.confluence.api.model.content.JsonSpaceProperty)}.
   */
  async update<T = unknown>(callback: Callback<T>): Promise<void>;
  /**
   * Updates a space property. The body contains the representation of the space property. Must include new version
   * number. If the given version number is 1, attempts to create a new space property, just like
   * {@link #create(String, com.atlassian.confluence.api.model.content.JsonSpaceProperty)}.
   */
  async update<T = unknown>(callback?: never): Promise<T>;
  async update<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'update' });
  }

  /** Deletes a space property.Responses */
  async delete<T = unknown>(callback: Callback<T>): Promise<void>;
  /** Deletes a space property.Responses */
  async delete<T = unknown>(callback?: never): Promise<T>;
  async delete<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/space/${parameters.spaceKey}/property/${parameters.key}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'delete' });
  }
}
