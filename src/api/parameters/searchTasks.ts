export interface SearchTasks {
  /** The starting offset for the results. */
  start?: number;
  /** The number of results to be returned. */
  limit?: number;
  /** The space key of a space. Multiple space keys can be specified. */
  spaceKey?: string;
  /** The page id of a page. Multiple page ids can be specified. */
  pageId?: string;
  /** Account ID of a user to whom a task is assigned. Multiple users can be specified. */
  assignee?: string;
  /** Account ID of a user to who created a task. Multiple users can be specified. */
  creator?: string;
  /** Account ID of a user who completed a task. Multiple users can be specified. */
  completedUser?: string;
  /** Start of date range based on due dates (inclusive). */
  duedateFrom?: number;
  /** End of date range based on due dates (inclusive). */
  duedateTo?: number;
  /** Start of date range based on create dates (inclusive). */
  createdateFrom?: number;
  /** End of date range based on create dates (inclusive). */
  createdateTo?: number;
  /** Start of date range based on complete dates (inclusive). */
  completedateFrom?: number;
  /** End of date range based on complete dates (inclusive). */
  completedateTo?: number;
  /** The status of the task. (checked/unchecked) */
  status?: string;
}
