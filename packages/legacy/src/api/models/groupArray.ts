import type { Group } from './group.js';

export interface GroupArray {
  results: Group[];
  start: number;
  limit: number;
  size: number;
}
