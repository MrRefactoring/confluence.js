import type { ContentBody } from './contentBody.js';
import type { GenericLinks } from './genericLinks.js';
import type { Label } from './label.js';

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
