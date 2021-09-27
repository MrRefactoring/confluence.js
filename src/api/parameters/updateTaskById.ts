import { TaskStatusUpdate } from '../models';

export interface UpdateTaskById extends TaskStatusUpdate {
  /** Global ID of the inline task to update */
  inlineTaskId: string;
}
