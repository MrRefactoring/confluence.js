import type { Content } from './content';
import type { GenericLinks } from './genericLinks';

export interface ContentArray<T = Content> {
  results: T[];
  start?: number;
  limit?: number;
  size: number;
  _links: GenericLinks;
}
