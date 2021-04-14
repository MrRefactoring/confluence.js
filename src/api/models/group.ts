import { GenericLinks } from './genericLinks';

export interface Group {
  type: string;
  name: string;
  id: string;
  _links: GenericLinks;
}
