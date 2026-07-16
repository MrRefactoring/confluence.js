export interface RemoveContentState {
  /** The Id of the content whose content state is to be set. */
  id?: string;
  /** Status of content state from which to delete state. Can be draft or archived */
  status?: string;
}
