import type { User } from './user.js';

export interface UserArray {
  results: User[];
  start: number;
  limit: number;
  size: number;
}
