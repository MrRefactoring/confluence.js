import type { TaskStatusUpdate } from '../models/index.js';

export interface UpdateTaskById extends TaskStatusUpdate {
  /** Global ID of the inline task to update */
  inlineTaskId: string;
}
