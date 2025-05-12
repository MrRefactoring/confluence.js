import type { Group } from './group';

export interface GroupArray {
  results: Group[];
  start: number;
  limit: number;
  size: number;
}
