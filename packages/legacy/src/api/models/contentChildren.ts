import type { ContentArray } from './contentArray.js';
import type { GenericLinks } from './genericLinks.js';

export interface ContentChildren {
  attachment?: ContentArray;
  comment?: ContentArray;
  page?: ContentArray;
  _expandable: {
    attachment?: string;
    comment?: string;
    page?: string;
  };
  _links: GenericLinks;
}
