import { TasksSchema, type Tasks } from '../models/tasks';
import { TaskSchema, type Task } from '../models/task';
import type { GetTasks } from '../parameters/getTasks';
import type { GetTaskById } from '../parameters/getTaskById';
import type { UpdateTask } from '../parameters/updateTask';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Returns all tasks. The number of results is limited by the `limit` parameter and additional results (if available)
 * will be available through the `next` URL present in the `Link` response header.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to access the Confluence site ('Can
 * use' global permission). Only tasks that the user has permission to view will be returned.
 */
export async function getTasks(client: Client, parameters?: GetTasks): Promise<Tasks> {
  const config: SendRequestOptions<Tasks> = {
    url: '/wiki/api/v2/tasks',
    method: 'GET',
    searchParams: {
      'body-format': parameters?.bodyFormat,
      'include-blank-tasks': parameters?.includeBlankTasks,
      status: parameters?.status,
      'task-id': parameters?.taskId,
      'space-id': parameters?.spaceId,
      'page-id': parameters?.pageId,
      'blogpost-id': parameters?.blogpostId,
      'created-by': parameters?.createdBy,
      'assigned-to': parameters?.assignedTo,
      'completed-by': parameters?.completedBy,
      'created-at-from': parameters?.createdAtFrom,
      'created-at-to': parameters?.createdAtTo,
      'due-at-from': parameters?.dueAtFrom,
      'due-at-to': parameters?.dueAtTo,
      'completed-at-from': parameters?.completedAtFrom,
      'completed-at-to': parameters?.completedAtTo,
      cursor: parameters?.cursor,
      limit: parameters?.limit,
    },
    schema: TasksSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a specific task.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to view the containing page or blog
 * post and its corresponding space.
 */
export async function getTaskById(client: Client, parameters: GetTaskById): Promise<Task> {
  const config: SendRequestOptions<Task> = {
    url: `/wiki/api/v2/tasks/${parameters.id}`,
    method: 'GET',
    searchParams: {
      'body-format': parameters.bodyFormat,
    },
    schema: TaskSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update a task by id. This endpoint currently only supports updating task status.
 *
 * **[Permissions](https://confluence.atlassian.com/x/_AozKw) required**: Permission to edit the containing page or blog
 * post and view its corresponding space.
 */
export async function updateTask(client: Client, parameters: UpdateTask): Promise<Task> {
  const config: SendRequestOptions<Task> = {
    url: `/wiki/api/v2/tasks/${parameters.id}`,
    method: 'PUT',
    searchParams: {
      'body-format': parameters.bodyFormat,
    },
    body: parameters.body,
    schema: TaskSchema,
  };

  return await client.sendRequest(config);
}
