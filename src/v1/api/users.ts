import { UserSchema, type User } from '../models/user';
import { UserAnonymousSchema, type UserAnonymous } from '../models/userAnonymous';
import { GroupArrayWithLinksSchema, type GroupArrayWithLinks } from '../models/groupArrayWithLinks';
import { BulkUserLookupArraySchema, type BulkUserLookupArray } from '../models/bulkUserLookupArray';
import { AccountIdEmailRecordSchema, type AccountIdEmailRecord } from '../models/accountIdEmailRecord';
import { AccountIdEmailRecordArraySchema, type AccountIdEmailRecordArray } from '../models/accountIdEmailRecordArray';
import type { GetUser } from '../parameters/getUser';
import type { GetAnonymousUser } from '../parameters/getAnonymousUser';
import type { GetCurrentUser } from '../parameters/getCurrentUser';
import type { GetGroupMembershipsForUser } from '../parameters/getGroupMembershipsForUser';
import type { GetBulkUserLookup } from '../parameters/getBulkUserLookup';
import type { GetPrivacyUnsafeUserEmail } from '../parameters/getPrivacyUnsafeUserEmail';
import type { GetPrivacyUnsafeUserEmailBulk } from '../parameters/getPrivacyUnsafeUserEmailBulk';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns a user. This includes information about the user, such as the display name, account ID, profile picture, and
 * more. The information returned may be restricted by the user's profile visibility settings.
 *
 * **Note:** to add, edit, or delete users in your organization, see the [user management REST
 * API](https://developer.atlassian.com/cloud/admin/user-management/about/).
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getUser(client: Client, parameters: GetUser): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/wiki/rest/api/user',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
      expand: parameters.expand,
    },
    schema: UserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information about how anonymous users are represented, like the profile picture and display name.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getAnonymousUser(client: Client, parameters?: GetAnonymousUser): Promise<UserAnonymous> {
  const config: SendRequestOptions<UserAnonymous> = {
    url: '/wiki/rest/api/user/anonymous',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
    },
    schema: UserAnonymousSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the currently logged-in user. This includes information about the user, like the display name, userKey,
 * account ID, profile picture, and more.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getCurrentUser(client: Client, parameters?: GetCurrentUser): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/wiki/rest/api/user/current',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
    },
    schema: UserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the groups that a user is a member of.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getGroupMembershipsForUser(
  client: Client,
  parameters: GetGroupMembershipsForUser,
): Promise<GroupArrayWithLinks> {
  const config: SendRequestOptions<GroupArrayWithLinks> = {
    url: '/wiki/rest/api/user/memberof',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: GroupArrayWithLinksSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns user details for the ids provided in the request. Currently this API returns a maximum of 100 results. If
 * more than 100 account ids are passed in, then the first 100 will be returned.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getBulkUserLookup(client: Client, parameters: GetBulkUserLookup): Promise<BulkUserLookupArray> {
  const config: SendRequestOptions<BulkUserLookupArray> = {
    url: '/wiki/rest/api/user/bulk',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
      expand: parameters.expand,
    },
    schema: BulkUserLookupArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is
 * only available to apps approved by Atlassian, according to these
 * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
 * For Forge apps, this API only supports access via asApp() requests.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getPrivacyUnsafeUserEmail(
  client: Client,
  parameters: GetPrivacyUnsafeUserEmail,
): Promise<AccountIdEmailRecord> {
  const config: SendRequestOptions<AccountIdEmailRecord> = {
    url: '/wiki/rest/api/user/email',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
    },
    schema: AccountIdEmailRecordSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a user's email address regardless of the user’s profile visibility settings. For Connect apps, this API is
 * only available to apps approved by Atlassian, according to these
 * [guidelines](https://community.developer.atlassian.com/t/guidelines-for-requesting-access-to-email-address/27603).
 * For Forge apps, this API only supports access via asApp() requests.
 *
 * Any accounts which are not available will not be included in the result.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getPrivacyUnsafeUserEmailBulk(
  client: Client,
  parameters: GetPrivacyUnsafeUserEmailBulk,
): Promise<AccountIdEmailRecordArray> {
  const config: SendRequestOptions<AccountIdEmailRecordArray> = {
    url: '/wiki/rest/api/user/email/bulk',
    method: 'GET',
    searchParams: {
      accountId: parameters.accountId,
    },
    schema: AccountIdEmailRecordArraySchema,
  };

  return await client.sendRequest(config);
}
