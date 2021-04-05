import { BlueprintTemplate } from './blueprintTemplate';
import { GenericLinks } from './genericLinks';

export interface BlueprintTemplateArray {
  results: BlueprintTemplate[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
