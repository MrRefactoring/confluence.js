import { LabelCreate } from '../models';

export interface AddLabelsToContent {
  /** The ID of the content that will have labels added to it. */
  id: string;

  labels: LabelCreate[];
}
