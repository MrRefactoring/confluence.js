import { Content } from './content';
import { GenericLinks } from './genericLinks';

export interface ContentArray {
  results: Content[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
