import { ContentProperty } from './contentProperty';
import { GenericLinks } from './genericLinks';

export interface ContentPropertyArray {
  results: ContentProperty[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
