import { GenericLinks } from './genericLinks';

export interface AttachmentContainer {
  id: string;
  type: 'page' | 'string';
  status: 'current' | string;
  title: string;
  macroRenderedOutput: any;
  extensions: {
    position: number;
  };
  _expandable: {
    container: string;
    metadata: string;
    restrictions: string;
    history: string;
    body: string;
    version: string;
    descendants: string;
    space: string;
    childTypes: string;
    operations: string;
    schedulePublishDate: string;
    children: string;
    ancestors: string;
  };
  _links: GenericLinks;
}
