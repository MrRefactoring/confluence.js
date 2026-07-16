export interface LabelCreate {
  /** The prefix for the label. */
  prefix: 'global' | 'my' | 'team' | string;
  /** The name of the label, which will be shown in the UI. */
  name: string;
}
