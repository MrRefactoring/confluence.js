import type { LabeledContentType } from './labeledContentType.js';

export interface LabeledContent {
  contentType: LabeledContentType;
  contentId: number;
  /** Title of the content. */
  title: string;
}
