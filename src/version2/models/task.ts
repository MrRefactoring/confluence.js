import { Body } from './body';

export interface Task {
  /** ID of the task. */
  id?: {};
  /** Local ID of the task. This ID is local to the corresponding page or blog post. */
  localId?: {};
  /** ID of the space the task is in. */
  spaceId?: {};
  /** ID of the page the task is in. */
  pageId?: {};
  /** ID of the blog post the task is in. */
  blogPostId?: {};
  /** Status of the task. */
  status?: string;
  body?: Body;
  /** Account ID of the user who created this task. */
  createdBy?: string;
  /** Account ID of the user to whom this task is assigned. */
  assignedTo?: string;
  /** Account ID of the user who completed this task. */
  completedBy?: string;
  /** Date and time when the task was created. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  createdAt?: string;
  /** Date and time when the task was updated. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  updatedAt?: string;
  /** Date and time when the task is due. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  dueAt?: string;
  /** Date and time when the task was completed. In format "YYYY-MM-DDTHH:mm:ss.sssZ". */
  completedAt?: string;
}
