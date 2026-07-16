import type { ContentBody } from './contentBody.js';
import type { GenericLinks } from './genericLinks.js';
import type { Label } from './label.js';

export interface ContentTemplate {
  templateId: string;
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
