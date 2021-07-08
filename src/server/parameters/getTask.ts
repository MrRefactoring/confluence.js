export interface GetTask {
  id: string | number;
  /** A comma separated list of properties to expand on the task */
  expand?: string;
}
