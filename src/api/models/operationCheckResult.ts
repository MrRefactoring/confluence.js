/** An operation and the target entity that it applies to, e.g. create page. */
export interface OperationCheckResult {
  /** The operation itself. */
  operation: string;
  /** The space or content type that the operation applies to. */
  targetType: string;
}
