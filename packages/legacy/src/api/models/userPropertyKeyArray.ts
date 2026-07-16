import type { GenericLinks } from './genericLinks.js';

export interface UserPropertyKeyArray {
  results: {
    key?: string;
  }[];
  start?: number;
  limit?: number;
  size?: number;
  Links?: GenericLinks;
}
