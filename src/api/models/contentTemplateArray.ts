import { ContentTemplate } from './contentTemplate';
import { GenericLinks } from './genericLinks';

export interface ContentTemplateArray {
  results: ContentTemplate[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
