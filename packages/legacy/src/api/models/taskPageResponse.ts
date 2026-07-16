import type { Task } from './task.js';

export interface TaskPageResponse {
  results: Task[];
  start: number;
  limit: number;
  size: number;
}
