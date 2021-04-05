import { Label } from './label';
import { ContentBody } from './contentBody';
import { GenericLinks } from './genericLinks';

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
