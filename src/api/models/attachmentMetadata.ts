import { GenericLinks } from './genericLinks';

export interface AttachmentMetadata {
  comment: string;
  mediaType: string;
  labels: {
    results: string[];
    start: number;
    limit: number;
    size: number;
    _links: GenericLinks;
  };
  _expandable: {
    currentuser: string;
    comments: string;
    simple: string;
    properties: string;
    frontend: string;
    likes: string;
  };
}
