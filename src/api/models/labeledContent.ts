import { LabeledContentType } from './labeledContentType';

export interface LabeledContent {
  contentType: LabeledContentType;
  contentId: number;
  /** Title of the content. */
  title: string;
}
