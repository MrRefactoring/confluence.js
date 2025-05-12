import type { LabeledContent } from './labeledContent';

export interface LabeledContentPageResponse {
  results: LabeledContent[];
  start?: number;
  limit?: number;
  size: number;
}
