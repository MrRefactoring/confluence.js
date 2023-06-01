import { EmbeddedContent } from './embeddedContent';
import { GenericLinks } from './genericLinks';
import { WebResourceDependencies } from './webResourceDependencies';

export interface AsyncContentBody {
  value?: string;
  representation?: string;
  renderTaskId?: string;
  error?: string;
  /**
   * Rerunning is reserved for when the job is working, but there is a previous run's value in the cache. You may choose
   * to continue polling, or use the cached value.
   */
  status?: string;
  embeddedContent?: EmbeddedContent[];
  webresource?: WebResourceDependencies;
  mediaToken?: {
    collectionIds?: string[];
    contentId?: string;
    expiryDateTime?: string;
    fileIds?: string[];
    token?: string;
  };
  Expandable?: {
    content?: string;
    embeddedContent?: string;
    webresource?: string;
    mediaToken?: string;
  };
  Links?: GenericLinks;
}
