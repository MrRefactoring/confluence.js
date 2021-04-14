import { Label } from './label';
import { LabeledContentPageResponse } from './labeledContentPageResponse';

export interface LabelDetails {
  label: Label;
  associatedContents?: LabeledContentPageResponse;
}
