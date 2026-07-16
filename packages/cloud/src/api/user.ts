import { BulkUserLookupSchema, type BulkUserLookup } from '#/models/bulkUserLookup';
import { AccessByEmailSchema, type AccessByEmail } from '#/models/accessByEmail';
import type { CreateBulkUserLookup } from '#/parameters/createBulkUserLookup';
import type { CheckAccessByEmail } from '#/parameters/checkAccessByEmail';
import type { InviteByEmail } from '#/parameters/inviteByEmail';
import type { Client, SendRequestOptions } from '@confluence.js/core';

/**
 * Returns user details for the ids provided in the request body.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). The user must be able to view user profiles in the Confluence site.
 */
export async function createBulkUserLookup(client: Client, parameters: CreateBulkUserLookup): Promise<BulkUserLookup> {
  const config: SendRequestOptions<BulkUserLookup> = {
    url: '/users-bulk',
    method: 'POST',
    body: parameters.body,
    schema: BulkUserLookupSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the list of emails from the input list that do not have access to site.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function checkAccessByEmail(client: Client, parameters: CheckAccessByEmail): Promise<AccessByEmail> {
  const config: SendRequestOptions<AccessByEmail> = {
    url: '/user/access/check-access-by-email',
    method: 'POST',
    body: parameters.body,
    schema: AccessByEmailSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Invite a list of emails to the site.
 *
 * Ignores all invalid emails and no action is taken for the emails that already have access to the site.
 *
 * <b>NOTE:</b> This API is asynchronous and may take some time to complete.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function inviteByEmail(client: Client, parameters: InviteByEmail): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/user/access/invite-by-email',
    method: 'POST',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}
