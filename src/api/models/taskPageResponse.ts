import { Task } from './task';

export interface TaskPageResponse {
  results: Task[];
  start: number;
  limit: number;
  size: number;
}
