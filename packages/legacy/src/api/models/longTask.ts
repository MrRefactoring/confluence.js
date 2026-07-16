export interface LongTask {
  /** A unique identifier for the long task */
  id: string;
  links: {
    /** The URL to retrieve status of long task. */
    status?: string;
  };
}
