import { RelationData } from './relationData';
import { GenericLinks } from './genericLinks';

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
