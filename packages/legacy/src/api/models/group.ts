import type { GenericLinks } from './genericLinks.js';

export interface Group {
  type: string;
  name: string;
  id: string;
  _links: GenericLinks;
}
