import { Label } from './label';

export interface LabelArray {
  results: Label[];
  start: number;
  limit: number;
  size: number;
  _links: Record<string, any>;
}
