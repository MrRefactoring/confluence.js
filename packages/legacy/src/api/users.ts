import type * as Models from './models/index.js';
import type * as Parameters from './parameters/index.js';
import type { Client } from '../clients/index.js';
import type { Callback } from '../callback.js';
import type { RequestConfig } from '../requestConfig.js';

export class Users {
  constructor(private client: Client) {}

  /**
   * Returns a user. This includes information about the user, such as the display name, account ID, profile picture,
   * and more. The information returned may be restricted by the user's profile visibility settings.
   *
   * **Note:** to add, edit, or delete users in your organization, see the [user management REST
   * API](/cloud/admin/user-management/about/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback: Callback<T>): Promise<void>;
  /**
   * Returns a user. This includes information about the user, such as the display name, account ID, profile picture,
   * and more. The information returned may be restricted by the user's profile visibility settings.
   *
   * **Note:** to add, edit, or delete users in your organization, see the [user management REST
   * API](/cloud/admin/user-management/about/).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback?: never): Promise<T>;
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/user',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns information about how anonymous users are represented, like the profile picture and display name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getAnonymousUser<T = Models.UserAnonymous>(
    parameters: Parameters.GetAnonymousUser | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns information about how anonymous users are represented, like the profile picture and display name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getAnonymousUser<T = Models.UserAnonymous>(
    parameters?: Parameters.GetAnonymousUser,
    callback?: never,
  ): Promise<T>;
  async getAnonymousUser<T = Models.UserAnonymous>(
    parameters?: Parameters.GetAnonymousUser,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/user/anonymous',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the currently logged-in user. This includes information about the user, like the display name, userKey,
   * account ID, profile picture, and more.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getCurrentUser<T = Models.User>(
    parameters: Parameters.GetCurrentUser | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the currently logged-in user. This includes information about the user, like the display name, userKey,
   * account ID, profile picture, and more.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: never): Promise<T>;
  async getCurrentUser<T = Models.User>(
    parameters?: Parameters.GetCurrentUser,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/user/current',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the groups that a user is a member of.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupMembershipsForUser<T = Models.GroupArrayWithLinks>(
    parameters: Parameters.GetGroupMembershipsForUser,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the groups that a user is a member of.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupMembershipsForUser<T = Models.GroupArrayWithLinks>(
    parameters: Parameters.GetGroupMembershipsForUser,
    callback?: never,
  ): Promise<T>;
  async getGroupMembershipsForUser<T = Models.GroupArrayWithLinks>(
    parameters: Parameters.GetGroupMembershipsForUser,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/user/memberof',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns user details for the ids provided in the request. Currently this API returns a maximum of 100 results. If
   * more than 100 account ids are passed in, then the first 100 will be returned.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getBulkUserLookup<T = Models.BulkUserLookupArray>(
    parameters: Parameters.GetBulkUserLookup,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns user details for the ids provided in the request. Currently this API returns a maximum of 100 results. If
   * more than 100 account ids are passed in, then the first 100 will be returned.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getBulkUserLookup<T = Models.BulkUserLookupArray>(
    parameters: Parameters.GetBulkUserLookup,
    callback?: never,
  ): Promise<T>;
  async getBulkUserLookup<T = Models.BulkUserLookupArray>(
    parameters: Parameters.GetBulkUserLookup,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/user/bulk',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        expand: parameters.expand,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getPrivacyUnsafeUserEmail<T = Models.AccountIdEmailRecord>(
    parameters: Parameters.GetPrivacyUnsafeUserEmail,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getPrivacyUnsafeUserEmail<T = Models.AccountIdEmailRecord>(
    parameters: Parameters.GetPrivacyUnsafeUserEmail,
    callback?: never,
  ): Promise<T>;
  async getPrivacyUnsafeUserEmail<T = Models.AccountIdEmailRecord>(
    parameters: Parameters.GetPrivacyUnsafeUserEmail,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/user/email',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   *
   * Any accounts which are not available will not be included in the result.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getPrivacyUnsafeUserEmailBulk<T = Models.AccountIdEmailRecordArray>(
    parameters: Parameters.GetPrivacyUnsafeUserEmailBulk,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is
   * only available to apps approved by Atlassian, according to these
   * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
   * For Forge apps, this API only supports access via asApp() requests.
   *
   * Any accounts which are not available will not be included in the result.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getPrivacyUnsafeUserEmailBulk<T = Models.AccountIdEmailRecordArray>(
    parameters: Parameters.GetPrivacyUnsafeUserEmailBulk,
    callback?: never,
  ): Promise<T>;
  async getPrivacyUnsafeUserEmailBulk<T = Models.AccountIdEmailRecordArray>(
    parameters: Parameters.GetPrivacyUnsafeUserEmailBulk,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/user/email/bulk',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
