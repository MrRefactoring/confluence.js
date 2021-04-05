import { User } from './user';

export interface UserArray {
  results: User[];
  start: number;
  limit: number;
  size: number;
}
