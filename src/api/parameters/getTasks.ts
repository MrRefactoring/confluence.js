export interface GetTasks {
  /** The key of the tasks. */
  key?: string;
  /** The starting index of the returned tasks. */
  start?: number;
  /** The maximum number of tasks to return per page. Note, this may be restricted by fixed system limits. */
  limit?: number;
}
