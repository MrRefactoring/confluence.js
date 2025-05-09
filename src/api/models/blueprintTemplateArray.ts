import type { BlueprintTemplate } from './blueprintTemplate';
import type { GenericLinks } from './genericLinks';

export interface BlueprintTemplateArray {
  results: BlueprintTemplate[];
  start: number;
  limit: number;
  size: number;
  _links: GenericLinks;
}
