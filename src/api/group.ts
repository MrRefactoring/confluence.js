import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class Group {
  constructor(private client: Client) {}

  /**
   * Returns all user groups. The returned groups are ordered alphabetically in ascending order by group name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroups<T = Models.GroupArrayWithLinks>(
    parameters: Parameters.GetGroups | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all user groups. The returned groups are ordered alphabetically in ascending order by group name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroups<T = Models.GroupArrayWithLinks>(parameters?: Parameters.GetGroups, callback?: never): Promise<T>;
  async getGroups<T = Models.GroupArrayWithLinks>(
    parameters?: Parameters.GetGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group',
      method: 'GET',
      params: {
        start: parameters?.start,
        limit: parameters?.limit,
        accessType: parameters?.accessType,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new user group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async createGroup<T = Models.Group>(
    parameters: Parameters.CreateGroup | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new user group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async createGroup<T = Models.Group>(parameters?: Parameters.CreateGroup, callback?: never): Promise<T>;
  async createGroup<T = Models.Group>(parameters?: Parameters.CreateGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group',
      method: 'POST',
      data: {
        name: parameters?.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete user group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeGroup<T = void>(parameters: Parameters.RemoveGroup, callback: Callback<T>): Promise<void>;
  /**
   * Delete user group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeGroup<T = void>(parameters: Parameters.RemoveGroup, callback?: never): Promise<T>;
  async removeGroup<T = void>(parameters: Parameters.RemoveGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group',
      method: 'DELETE',
      params: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a user group for a given group name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupByQueryParam<T = Models.Group>(
    parameters: Parameters.GetGroupByQueryParam,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a user group for a given group name.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupByQueryParam<T = Models.Group>(
    parameters: Parameters.GetGroupByQueryParam,
    callback?: never,
  ): Promise<T>;
  async getGroupByQueryParam<T = Models.Group>(
    parameters: Parameters.GetGroupByQueryParam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/by-name',
      method: 'GET',
      params: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a user group for a given group id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupByGroupId<T = Models.Group>(
    parameters: Parameters.GetGroupByGroupId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a user group for a given group id.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupByGroupId<T = Models.Group>(parameters: Parameters.GetGroupByGroupId, callback?: never): Promise<T>;
  async getGroupByGroupId<T = Models.Group>(
    parameters: Parameters.GetGroupByGroupId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/by-id',
      method: 'GET',
      params: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete user group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeGroupById<T = void>(parameters: Parameters.RemoveGroupById, callback: Callback<T>): Promise<void>;
  /**
   * Delete user group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeGroupById<T = void>(parameters: Parameters.RemoveGroupById, callback?: never): Promise<T>;
  async removeGroupById<T = void>(parameters: Parameters.RemoveGroupById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/by-id',
      method: 'DELETE',
      params: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a user group for a given group name.
   *
   * Use updated Get group API
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupByName<T = Models.Group>(parameters: Parameters.GetGroupByName, callback: Callback<T>): Promise<void>;
  /**
   * Returns a user group for a given group name.
   *
   * Use updated Get group API
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupByName<T = Models.Group>(parameters: Parameters.GetGroupByName, callback?: never): Promise<T>;
  async getGroupByName<T = Models.Group>(
    parameters: Parameters.GetGroupByName,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/group/${parameters.groupName}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the users that are members of a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getMembersByQueryParam<T = Models.UserArray>(
    parameters: Parameters.GetMembersByQueryParam,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the users that are members of a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getMembersByQueryParam<T = Models.UserArray>(
    parameters: Parameters.GetMembersByQueryParam,
    callback?: never,
  ): Promise<T>;
  async getMembersByQueryParam<T = Models.UserArray>(
    parameters: Parameters.GetMembersByQueryParam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/member',
      method: 'GET',
      params: {
        name: parameters.name,
        start: parameters.start,
        limit: parameters.limit,
        shouldReturnTotalSize: parameters.shouldReturnTotalSize,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the users that are members of a group.
   *
   * Use updated Get group API
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupMembers<T = Models.UserArray>(
    parameters: Parameters.GetGroupMembers,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the users that are members of a group.
   *
   * Use updated Get group API
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupMembers<T = Models.UserArray>(parameters: Parameters.GetGroupMembers, callback?: never): Promise<T>;
  async getGroupMembers<T = Models.UserArray>(
    parameters: Parameters.GetGroupMembers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/group/${parameters.groupName}/member`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Get search results of groups by partial query provided. */
  async searchGroups<T = Models.GroupArrayWithLinks>(
    parameters: Parameters.SearchGroups,
    callback: Callback<T>,
  ): Promise<void>;
  /** Get search results of groups by partial query provided. */
  async searchGroups<T = Models.GroupArrayWithLinks>(parameters: Parameters.SearchGroups, callback?: never): Promise<T>;
  async searchGroups<T = Models.GroupArrayWithLinks>(
    parameters: Parameters.SearchGroups,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/picker',
      method: 'GET',
      params: {
        query: parameters.query,
        start: parameters.start,
        limit: parameters.limit,
        shouldReturnTotalSize: parameters.shouldReturnTotalSize,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a user as a member in a group represented by its groupId
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async addUserToGroupByGroupId<T = unknown>(
    parameters: Parameters.AddUserToGroupByGroupId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds a user as a member in a group represented by its groupId
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async addUserToGroupByGroupId<T = unknown>(
    parameters: Parameters.AddUserToGroupByGroupId,
    callback?: never,
  ): Promise<T>;
  async addUserToGroupByGroupId<T = unknown>(
    parameters: Parameters.AddUserToGroupByGroupId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/userByGroupId',
      method: 'POST',
      params: {
        groupId: parameters.groupId,
      },
      data: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Remove user as a member from a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeMemberFromGroupByGroupId<T = void>(
    parameters: Parameters.RemoveMemberFromGroupByGroupId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Remove user as a member from a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeMemberFromGroupByGroupId<T = void>(
    parameters: Parameters.RemoveMemberFromGroupByGroupId,
    callback?: never,
  ): Promise<T>;
  async removeMemberFromGroupByGroupId<T = void>(
    parameters: Parameters.RemoveMemberFromGroupByGroupId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/userByGroupId',
      method: 'DELETE',
      params: {
        groupId: parameters.groupId,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the users that are members of a group.
   *
   * Use updated Get group API
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupMembersByGroupId<T = Models.UserArray>(
    parameters: Parameters.GetGroupMembersByGroupId,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the users that are members of a group.
   *
   * Use updated Get group API
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site
   * ('Can use' global permission).
   */
  async getGroupMembersByGroupId<T = Models.UserArray>(
    parameters: Parameters.GetGroupMembersByGroupId,
    callback?: never,
  ): Promise<T>;
  async getGroupMembersByGroupId<T = Models.UserArray>(
    parameters: Parameters.GetGroupMembersByGroupId,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/api/group/${parameters.groupId}/membersByGroupId`,
      method: 'GET',
      params: {
        start: parameters.start,
        limit: parameters.limit,
        shouldReturnTotalSize: parameters.shouldReturnTotalSize,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a user as a member in a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async addUserToGroup<T = unknown>(parameters: Parameters.AddUserToGroup, callback: Callback<T>): Promise<void>;
  /**
   * Adds a user as a member in a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async addUserToGroup<T = unknown>(parameters: Parameters.AddUserToGroup, callback?: never): Promise<T>;
  async addUserToGroup<T = unknown>(parameters: Parameters.AddUserToGroup, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/user',
      method: 'POST',
      params: {
        name: parameters.name,
      },
      data: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Remove user as a member from a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeMemberFromGroup<T = void>(
    parameters: Parameters.RemoveMemberFromGroup,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Remove user as a member from a group.
   *
   * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: User must be a site admin.
   */
  async removeMemberFromGroup<T = void>(parameters: Parameters.RemoveMemberFromGroup, callback?: never): Promise<T>;
  async removeMemberFromGroup<T = void>(
    parameters: Parameters.RemoveMemberFromGroup,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/api/group/user',
      method: 'DELETE',
      params: {
        name: parameters.name,
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
