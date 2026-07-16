import type { ContentTemplate } from './contentTemplate.js';
import type { GenericLinks } from './genericLinks.js';

export interface ContentTemplateArray {
  results: ContentTemplate[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
