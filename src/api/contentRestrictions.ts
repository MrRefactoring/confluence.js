import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class ContentRestrictions {
  constructor(private client: Client) {}

  /**
   * Returns the restrictions on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.GetRestrictions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the restrictions on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.GetRestrictions,
    callback?: never,
  ): Promise<T>;
  async getRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.GetRestrictions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds restrictions to a piece of content. Note, this does not change any existing restrictions on the content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.AddRestrictions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds restrictions to a piece of content. Note, this does not change any existing restrictions on the content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.AddRestrictions,
    callback?: never,
  ): Promise<T>;
  async addRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.AddRestrictions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction`,
      method: 'POST',
      params: {
        expand: parameters.expand,
      },
      data: parameters.body,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates restrictions for a piece of content. This removes the existing restrictions and replaces them with the
   * restrictions in the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async updateRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.UpdateRestrictions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates restrictions for a piece of content. This removes the existing restrictions and replaces them with the
   * restrictions in the request.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async updateRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.UpdateRestrictions,
    callback?: never,
  ): Promise<T>;
  async updateRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.UpdateRestrictions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: parameters.body,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes all restrictions (read and update) on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async deleteRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.DeleteRestrictions,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes all restrictions (read and update) on a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async deleteRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.DeleteRestrictions,
    callback?: never,
  ): Promise<T>;
  async deleteRestrictions<T = Models.ContentRestrictionArray>(
    parameters: Parameters.DeleteRestrictions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction`,
      method: 'DELETE',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns restrictions on a piece of content by operation. This method is similar to [Get
   * restrictions](#api-content-id-restriction-get) except that the operations are properties of the return object,
   * rather than items in a results array.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getRestrictionsByOperation<T = Models.GetRestrictionsByOperation>(
    parameters: Parameters.GetRestrictionsByOperation,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns restrictions on a piece of content by operation. This method is similar to [Get
   * restrictions](#api-content-id-restriction-get) except that the operations are properties of the return object,
   * rather than items in a results array.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getRestrictionsByOperation<T = Models.GetRestrictionsByOperation>(
    parameters: Parameters.GetRestrictionsByOperation,
    callback?: never,
  ): Promise<T>;
  async getRestrictionsByOperation<T = Models.GetRestrictionsByOperation>(
    parameters: Parameters.GetRestrictionsByOperation,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the restictions on a piece of content for a given operation (read or update).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getRestrictionsForOperation<T = Models.ContentRestriction>(
    parameters: Parameters.GetRestrictionsForOperation,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the restictions on a piece of content for a given operation (read or update).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getRestrictionsForOperation<T = Models.ContentRestriction>(
    parameters: Parameters.GetRestrictionsForOperation,
    callback?: never,
  ): Promise<T>;
  async getRestrictionsForOperation<T = Models.ContentRestriction>(
    parameters: Parameters.GetRestrictionsForOperation,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns whether the specified content restriction applies to a group. For example, if a page with `id=123` has a
   * `read` restriction for the `admins` group, the following request will return `true`:
   *
   * `https://your-domain.atlassian.net/wiki/rest/api/content/123/restriction/byOperation/read/group/admins`
   *
   * Note that a response of `true` does not guarantee that the group can view the page, as it does not account for
   * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
   * permissions](https://confluence.atlassian.com/x/_AozKw).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getContentRestrictionStatusForGroup<T = unknown>(
    parameters: Parameters.GetContentRestrictionStatusForGroup,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns whether the specified content restriction applies to a group. For example, if a page with `id=123` has a
   * `read` restriction for the `admins` group, the following request will return `true`:
   *
   * `https://your-domain.atlassian.net/wiki/rest/api/content/123/restriction/byOperation/read/group/admins`
   *
   * Note that a response of `true` does not guarantee that the group can view the page, as it does not account for
   * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
   * permissions](https://confluence.atlassian.com/x/_AozKw).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getContentRestrictionStatusForGroup<T = unknown>(
    parameters: Parameters.GetContentRestrictionStatusForGroup,
    callback?: never,
  ): Promise<T>;
  async getContentRestrictionStatusForGroup<T = unknown>(
    parameters: Parameters.GetContentRestrictionStatusForGroup,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/group/${parameters.groupName}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a group to a content restriction. That is, grant read or update permission to the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addGroupToContentRestriction<T = unknown>(
    parameters: Parameters.AddGroupToContentRestriction,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds a group to a content restriction. That is, grant read or update permission to the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addGroupToContentRestriction<T = unknown>(
    parameters: Parameters.AddGroupToContentRestriction,
    callback?: never,
  ): Promise<T>;
  async addGroupToContentRestriction<T = unknown>(
    parameters: Parameters.AddGroupToContentRestriction,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/group/${parameters.groupName}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeGroupByName<T = unknown>(parameters: Parameters.RemoveGroupByName, callback: Callback<T>): Promise<void>;
  /**
   * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeGroupByName<T = unknown>(parameters: Parameters.RemoveGroupByName, callback?: never): Promise<T>;
  async removeGroupByName<T = unknown>(
    parameters: Parameters.RemoveGroupByName,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/group/${parameters.groupName}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns whether the specified content restriction applies to a group. For example, if a page with `id=123` has a
   * `read` restriction for the `123456` group id, the following request will return `true`:
   *
   * `https://your-domain.atlassian.net/wiki/rest/api/content/123/restriction/byOperation/read/byGroupId/123456`
   *
   * Note that a response of `true` does not guarantee that the group can view the page, as it does not account for
   * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
   * permissions](https://confluence.atlassian.com/x/_AozKw).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getIndividualGroupRestrictionStatusByGroupId<T = unknown>(
    parameters: Parameters.GetIndividualGroupRestrictionStatusByGroupId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns whether the specified content restriction applies to a group. For example, if a page with `id=123` has a
   * `read` restriction for the `123456` group id, the following request will return `true`:
   *
   * `https://your-domain.atlassian.net/wiki/rest/api/content/123/restriction/byOperation/read/byGroupId/123456`
   *
   * Note that a response of `true` does not guarantee that the group can view the page, as it does not account for
   * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
   * permissions](https://confluence.atlassian.com/x/_AozKw).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getIndividualGroupRestrictionStatusByGroupId<T = unknown>(
    parameters: Parameters.GetIndividualGroupRestrictionStatusByGroupId,
    callback?: never,
  ): Promise<T>;
  async getIndividualGroupRestrictionStatusByGroupId<T = unknown>(
    parameters: Parameters.GetIndividualGroupRestrictionStatusByGroupId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/byGroupId/${parameters.groupId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a group to a content restriction by Group Id. That is, grant read or update permission to the group for a
   * piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addGroupToContentRestrictionByGroupId<T = unknown>(
    parameters: Parameters.AddGroupToContentRestrictionByGroupId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds a group to a content restriction by Group Id. That is, grant read or update permission to the group for a
   * piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addGroupToContentRestrictionByGroupId<T = unknown>(
    parameters: Parameters.AddGroupToContentRestrictionByGroupId,
    callback?: never,
  ): Promise<T>;
  async addGroupToContentRestrictionByGroupId<T = unknown>(
    parameters: Parameters.AddGroupToContentRestrictionByGroupId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/byGroupId/${parameters.groupId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeGroupById<T = unknown>(parameters: Parameters.RemoveGroupById, callback: Callback<T>): Promise<void>;
  /**
   * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeGroupById<T = unknown>(parameters: Parameters.RemoveGroupById, callback?: never): Promise<T>;
  async removeGroupById<T = unknown>(
    parameters: Parameters.RemoveGroupById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/byGroupId/${parameters.groupId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns whether the specified content restriction applies to a user. For example, if a page with `id=123` has a
   * `read` restriction for a user with an account ID of `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`, the following
   * request will return `true`:
   *
   * `https://your-domain.atlassian.net/wiki/rest/api/content/123/restriction/byOperation/read/user?accountId=384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`
   *
   * Note that a response of `true` does not guarantee that the user can view the page, as it does not account for
   * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
   * permissions](https://confluence.atlassian.com/x/_AozKw).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getContentRestrictionStatusForUser<T = unknown>(
    parameters: Parameters.GetContentRestrictionStatusForUser,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns whether the specified content restriction applies to a user. For example, if a page with `id=123` has a
   * `read` restriction for a user with an account ID of `384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`, the following
   * request will return `true`:
   *
   * `https://your-domain.atlassian.net/wiki/rest/api/content/123/restriction/byOperation/read/user?accountId=384093:32b4d9w0-f6a5-3535-11a3-9c8c88d10192`
   *
   * Note that a response of `true` does not guarantee that the user can view the page, as it does not account for
   * account-inherited restrictions, space permissions, or even product access. For more information, see [Confluence
   * permissions](https://confluence.atlassian.com/x/_AozKw).
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the content.
   */
  async getContentRestrictionStatusForUser<T = unknown>(
    parameters: Parameters.GetContentRestrictionStatusForUser,
    callback?: never,
  ): Promise<T>;
  async getContentRestrictionStatusForUser<T = unknown>(
    parameters: Parameters.GetContentRestrictionStatusForUser,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/user`,
      method: 'GET',
      params: {
        key: parameters.key,
        userName: parameters.userName,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a user to a content restriction. That is, grant read or update permission to the user for a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addUserToContentRestriction<T = unknown>(
    parameters: Parameters.AddUserToContentRestriction,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds a user to a content restriction. That is, grant read or update permission to the user for a piece of content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async addUserToContentRestriction<T = unknown>(
    parameters: Parameters.AddUserToContentRestriction,
    callback?: never,
  ): Promise<T>;
  async addUserToContentRestriction<T = unknown>(
    parameters: Parameters.AddUserToContentRestriction,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/user`,
      method: 'PUT',
      params: {
        key: parameters.key,
        userName: parameters.userName,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeUserFromContentRestriction<T = unknown>(
    parameters: Parameters.RemoveUserFromContentRestriction,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes a group from a content restriction. That is, remove read or update permission for the group for a piece of
   * content.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the content.
   */
  async removeUserFromContentRestriction<T = unknown>(
    parameters: Parameters.RemoveUserFromContentRestriction,
    callback?: never,
  ): Promise<T>;
  async removeUserFromContentRestriction<T = unknown>(
    parameters: Parameters.RemoveUserFromContentRestriction,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/content/${parameters.id}/restriction/byOperation/${parameters.operationKey}/user`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        userName: parameters.userName,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
