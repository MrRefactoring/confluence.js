import type { LabeledContent } from './labeledContent.js';

export interface LabeledContentPageResponse {
  results: LabeledContent[];
  start?: number;
  limit?: number;
  size: number;
}
