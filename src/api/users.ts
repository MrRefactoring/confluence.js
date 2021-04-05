import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Users {
  constructor(private client: Client) { }
  /**
     * Returns a user. This includes information about the user, such as the
     * display name, account ID, profile picture, and more. The information returned may be
     * restricted by the user's profile visibility settings.
     *
     * **Note:** to add, edit, or delete users in your organization, see the
     * [user management REST API](/cloud/admin/user-management/about/).
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback: Callback<T>): Promise<void>;
  /**
     * Returns a user. This includes information about the user, such as the
     * display name, account ID, profile picture, and more. The information returned may be
     * restricted by the user's profile visibility settings.
     *
     * **Note:** to add, edit, or delete users in your organization, see the
     * [user management REST API](/cloud/admin/user-management/about/).
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback?: never): Promise<T>;
  async getUser<T = Models.User>(parameters: Parameters.GetUser, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user',
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
        expand: parameters.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getUser' });
  }
  /**
     * Returns information about how anonymous users are represented, like the
     * profile picture and display name.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getAnonymousUser<T = Models.UserAnonymous>(parameters: Parameters.GetAnonymousUser | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns information about how anonymous users are represented, like the
     * profile picture and display name.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getAnonymousUser<T = Models.UserAnonymous>(parameters?: Parameters.GetAnonymousUser, callback?: never): Promise<T>;
  async getAnonymousUser<T = Models.UserAnonymous>(parameters?: Parameters.GetAnonymousUser, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user/anonymous',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getAnonymousUser' });
  }
  /**
     * Returns the currently logged-in user. This includes information about
     * the user, like the display name, userKey, account ID, profile picture,
     * and more.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getCurrentUser<T = Models.User>(parameters: Parameters.GetCurrentUser | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns the currently logged-in user. This includes information about
     * the user, like the display name, userKey, account ID, profile picture,
     * and more.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: never): Promise<T>;
  async getCurrentUser<T = Models.User>(parameters?: Parameters.GetCurrentUser, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user/current',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getCurrentUser' });
  }
  /**
     * Returns the groups that a user is a member of.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getGroupMembershipsForUser<T = Models.GroupArray>(parameters: Parameters.GetGroupMembershipsForUser, callback: Callback<T>): Promise<void>;
  /**
     * Returns the groups that a user is a member of.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getGroupMembershipsForUser<T = Models.GroupArray>(parameters: Parameters.GetGroupMembershipsForUser, callback?: never): Promise<T>;
  async getGroupMembershipsForUser<T = Models.GroupArray>(parameters: Parameters.GetGroupMembershipsForUser, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user/memberof',
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
        accountId: parameters.accountId,
        start: parameters.start,
        limit: parameters.limit,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getGroupMembershipsForUser' });
  }
  /**
     * Returns user details for the ids provided in request.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getBulkUserLookup<T = Models.BulkUserLookupArray>(parameters: Parameters.GetBulkUserLookup, callback: Callback<T>): Promise<void>;
  /**
     * Returns user details for the ids provided in request.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getBulkUserLookup<T = Models.BulkUserLookupArray>(parameters: Parameters.GetBulkUserLookup, callback?: never): Promise<T>;
  async getBulkUserLookup<T = Models.BulkUserLookupArray>(parameters: Parameters.GetBulkUserLookup, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user/bulk',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        expand: parameters.expand,
        limit: parameters.limit,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getBulkUserLookup' });
  }
  /**
     * Returns a user's email address. This API is only available to apps approved by
     * Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getPrivacyUnsafeUserEmail<T = Models.AccountIdEmailRecord>(parameters: Parameters.GetPrivacyUnsafeUserEmail, callback: Callback<T>): Promise<void>;
  /**
     * Returns a user's email address. This API is only available to apps approved by
     * Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getPrivacyUnsafeUserEmail<T = Models.AccountIdEmailRecord>(parameters: Parameters.GetPrivacyUnsafeUserEmail, callback?: never): Promise<T>;
  async getPrivacyUnsafeUserEmail<T = Models.AccountIdEmailRecord>(parameters: Parameters.GetPrivacyUnsafeUserEmail, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user/email',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getPrivacyUnsafeUserEmail' });
  }
  /**
     * Returns user email addresses for a set of accountIds. This API is only available to apps approved by
     * Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
     *
     * Any accounts which are not available will not be included in the result.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getPrivacyUnsafeUserEmailBulk<T = Models.AccountIdEmailRecordArray>(parameters: Parameters.GetPrivacyUnsafeUserEmailBulk, callback: Callback<T>): Promise<void>;
  /**
     * Returns user email addresses for a set of accountIds. This API is only available to apps approved by
     * Atlassian, according to these [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
     *
     * Any accounts which are not available will not be included in the result.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * Permission to access the Confluence site ('Can use' global permission). */
  async getPrivacyUnsafeUserEmailBulk<T = Models.AccountIdEmailRecordArray>(parameters: Parameters.GetPrivacyUnsafeUserEmailBulk, callback?: never): Promise<T>;
  async getPrivacyUnsafeUserEmailBulk<T = Models.AccountIdEmailRecordArray>(parameters: Parameters.GetPrivacyUnsafeUserEmailBulk, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user/email/bulk',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getPrivacyUnsafeUserEmailBulk' });
  }
  /**
     * Returns the accountIds for the users specified in the key or username parameters. Note that multiple key and username parameters can be specified.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Confluence Administrator' global permission if specifying a user, otherwise
     * permission to access the Confluence site ('Can use' global permission). */
  async getBulkUserMigration<T = Models.MigratedUserArray>(parameters: Parameters.GetBulkUserMigration, callback: Callback<T>): Promise<void>;
  /**
     * Returns the accountIds for the users specified in the key or username parameters. Note that multiple key and username parameters can be specified.
     *
     * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**:
     * 'Confluence Administrator' global permission if specifying a user, otherwise
     * permission to access the Confluence site ('Can use' global permission). */
  async getBulkUserMigration<T = Models.MigratedUserArray>(parameters: Parameters.GetBulkUserMigration, callback?: never): Promise<T>;
  async getBulkUserMigration<T = Models.MigratedUserArray>(parameters: Parameters.GetBulkUserMigration, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/api/user/bulk/migration',
      method: 'GET',
      params: {
        key: parameters.key,
        username: parameters.username,
        start: parameters.start,
        limit: parameters.limit,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getBulkUserMigration' });
  }
}
