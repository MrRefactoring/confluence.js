export interface GetTasks {
  /**
   * The content format types to be returned in the `body` field of the response. If available, the representation will
   * be available under a response field of the same name under the `body` field.
   */
  'body-format'?: {};
  /** Specifies whether to include blank tasks in the response. Defaults to `true`. */
  'include-blank-tasks'?: boolean;
  /** Filters on the status of the task. */
  status?: string;
  /** Filters on task ID. Multiple IDs can be specified. */
  taskId?: number[];
  /** Filters on the space ID of the task. Multiple IDs can be specified. */
  spaceId?: number[];
  /**
   * Filters on the page ID of the task. Multiple IDs can be specified. Note - page and blog post filters can be used in
   * conjunction.
   */
  pageId?: number[];
  /**
   * Filters on the blog post ID of the task. Multiple IDs can be specified. Note - page and blog post filters can be
   * used in conjunction.
   */
  'blogpost-id'?: number[];
  /** Filters on the Account ID of the user who created this task. Multiple IDs can be specified. */
  'created-by'?: string[];
  /** Filters on the Account ID of the user to whom this task is assigned. Multiple IDs can be specified. */
  'assigned-to'?: string[];
  /** Filters on the Account ID of the user who completed this task. Multiple IDs can be specified. */
  'completed-by'?: string[];
  /**
   * Filters on start of date-time range of task based on creation date (inclusive). Input is epoch time in
   * milliseconds.
   */
  'created-at-from'?: number;
  /** Filters on end of date-time range of task based on creation date (inclusive). Input is epoch time in milliseconds. */
  'created-at-to'?: number;
  /** Filters on start of date-time range of task based on due date (inclusive). Input is epoch time in milliseconds. */
  'due-at-from'?: number;
  /** Filters on end of date-time range of task based on due date (inclusive). Input is epoch time in milliseconds. */
  'due-at-to'?: number;
  /**
   * Filters on start of date-time range of task based on completion date (inclusive). Input is epoch time in
   * milliseconds.
   */
  'completed-at-from'?: number;
  /**
   * Filters on end of date-time range of task based on completion date (inclusive). Input is epoch time in
   * milliseconds.
   */
  'completed-at-to'?: number;
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor?: string;
  /**
   * Maximum number of tasks per result to return. If more results exist, use the `Link` header to retrieve a relative
   * URL that will return the next set of results.
   */
  limit?: number;
}
