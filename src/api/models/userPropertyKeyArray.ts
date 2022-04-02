import { GenericLinks } from './genericLinks';

export interface UserPropertyKeyArray {
  results: {
    key?: string;
  }[];
  start?: number;
  limit?: number;
  size?: number;
  Links?: GenericLinks;
}
