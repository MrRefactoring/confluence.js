import { LongTaskStatusArraySchema, type LongTaskStatusArray } from '../models/longTaskStatusArray';
import { LongTaskStatusWithLinksSchema, type LongTaskStatusWithLinks } from '../models/longTaskStatusWithLinks';
import type { GetTasks } from '../parameters/getTasks';
import type { GetTask } from '../parameters/getTask';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns information about all active long-running tasks (e.g. space export), such as how long each task has been
 * running and the percentage of each task that has completed.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getTasks(client: Client, parameters?: GetTasks): Promise<LongTaskStatusArray> {
  const config: SendRequestOptions<LongTaskStatusArray> = {
    url: '/wiki/rest/api/longtask',
    method: 'GET',
    searchParams: {
      key: parameters?.key,
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: LongTaskStatusArraySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information about an active long-running task (e.g. space export), such as how long it has been running and
 * the percentage of the task that has completed.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission).
 */
export async function getTask(client: Client, parameters: GetTask): Promise<LongTaskStatusWithLinks> {
  const config: SendRequestOptions<LongTaskStatusWithLinks> = {
    url: `/wiki/rest/api/longtask/${parameters.id}`,
    method: 'GET',
    schema: LongTaskStatusWithLinksSchema,
  };

  return await client.sendRequest(config);
}
