export interface GetTasks {
  /** A comma separated list of properties to expand on the tasks */
  expand?: string;
  start?: number;
  limit?: number;
}
