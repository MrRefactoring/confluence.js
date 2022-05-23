import { Content } from './content';
import { GenericLinks } from './genericLinks';

export interface ContentArray<T = Content> {
  results: T[];
  start?: number;
  limit?: number;
  size: number;
  _links: GenericLinks;
}
