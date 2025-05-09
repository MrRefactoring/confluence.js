import type { GenericLinks } from './genericLinks';
import type { RelationData } from './relationData';

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
