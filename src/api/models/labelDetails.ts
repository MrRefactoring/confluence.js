import type { Label } from './label';
import type { LabeledContentPageResponse } from './labeledContentPageResponse';

export interface LabelDetails {
  label: Label;
  associatedContents?: LabeledContentPageResponse;
}
