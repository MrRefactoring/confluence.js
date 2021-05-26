import { Pagination } from '../../pagination';
import { Content } from './content';

export interface ContentChildren {
  attachment?: Pagination<Content>;
  comment?: Pagination<Content>;
  page?: Pagination<Content>;
  _expandable: {
    attachment?: string;
    comment?: string;
    page?: string;
  };
  _links: Record<string, any>;
}
