export interface GetTaskById {
  /** The ID of the task to be returned. If you don't know the task ID, use Get tasks and filter the results. */
  id: number;
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  'body-format'?: {};
}
