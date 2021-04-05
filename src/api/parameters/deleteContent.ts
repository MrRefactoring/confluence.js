export interface DeleteContent {
  /** The ID of the content to be deleted. */
  id: string;
  /** Set this to `trashed`, if the content's status is `trashed` and you want to purge it. */
  status?: string;
}
