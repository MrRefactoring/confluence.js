import type { ContentState } from './contentState.js';

export interface ContentStateResponse {
  /** Null or content state */
  contentState?: ContentState;
  /** Timestamp of last publish event where content state changed */
  lastUpdated?: string;
}
