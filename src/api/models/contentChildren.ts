import { ContentArray } from './contentArray';
import { GenericLinks } from './genericLinks';

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
