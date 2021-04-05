import { Label } from './label';
import { ContentBody } from './contentBody';
import { GenericLinks } from './genericLinks';

export interface BlueprintTemplate {
  templateId: string;
  originalTemplate: {
    pluginKey: string;
    moduleKey: string;
  };
  referencingBlueprint: string;
  name: string;
  description: string;
  labels: Label[];
  templateType: string;
  body?: ContentBody;
  _expandable: {
    body?: string;
  };
  _links: GenericLinks;
}
