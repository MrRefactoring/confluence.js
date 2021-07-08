export interface UpdateContent {
  [key: string]: any;

  id: string | number;
  /** The existing status of the content to be updated. */
  status?: string;
  conflictPolicy?: string;
}
