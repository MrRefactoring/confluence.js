import type { Label } from './label.js';
import type { LabeledContentPageResponse } from './labeledContentPageResponse.js';

export interface LabelDetails {
  label: Label;
  associatedContents?: LabeledContentPageResponse;
}
