export interface DeleteLabelFromSpace {
  /** The key of the space to remove a labels from. */
  spaceKey: string;
  /** The name of the label to remove */
  name: string;
  /** The prefix of the label to remove. If not provided defaults to global. */
  prefix?: string;
}
