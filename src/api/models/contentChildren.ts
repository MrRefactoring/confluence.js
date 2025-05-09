import type { ContentArray } from './contentArray';
import type { GenericLinks } from './genericLinks';

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
