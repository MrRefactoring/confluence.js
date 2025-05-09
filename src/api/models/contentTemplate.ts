import type { ContentBody } from './contentBody';
import type { GenericLinks } from './genericLinks';
import type { Label } from './label';

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
