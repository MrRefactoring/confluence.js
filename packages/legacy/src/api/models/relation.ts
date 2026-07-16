import type { GenericLinks } from './genericLinks.js';
import type { RelationData } from './relationData.js';

export interface Relation {
  name: string;
  relationData?: RelationData;
  source?: {};
  target?: {};
  _expandable: {
    relationData: string;
    source: string;
    target: string;
  };
  _links: GenericLinks;
}
