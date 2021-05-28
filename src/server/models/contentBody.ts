import { EmbeddedContent } from './embeddedContent';
import { WebResourceDependencies } from './webResourceDependencies';

export interface ContentBody {
  value: string;
  representation: string;
  embeddedContent?: EmbeddedContent[];
  webresource?: WebResourceDependencies;
  _expandable: {
    content?: string;
  };
}
