import type { EmbeddedContent } from './embeddedContent.js';
import type { WebResourceDependencies } from './webResourceDependencies.js';

export interface ContentBody {
  value: string;
  representation: string;
  embeddedContent?: EmbeddedContent[];
  webresource?: WebResourceDependencies;
  _expandable: {
    content?: string;
  };
}
