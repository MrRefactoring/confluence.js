import { Label } from './label';
import { GenericLinks } from './genericLinks';

export interface LabelArray {
  results: Label[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
