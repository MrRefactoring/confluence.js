import { GenericLinks } from './genericLinks';
import { RelationData } from './relationData';

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
