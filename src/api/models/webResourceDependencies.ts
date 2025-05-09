import type { SuperBatchWebResources } from './superBatchWebResources';

export interface WebResourceDependencies {
  keys?: string[];
  contexts?: string[];
  uris?: {
    all?: string;
    css?: string;
    js?: string;
  };
  tags?: {
    all?: string;
    css?: string;
    data?: string;
    js?: string;
  };
  superbatch?: SuperBatchWebResources;
}
