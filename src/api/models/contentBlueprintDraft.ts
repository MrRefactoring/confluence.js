export interface ContentBlueprintDraft {
  /** The version for the new content. */
  version: {
    /** The version number. Set this to `1`. */
    number: number;
  };
  /** The title of the content. If you don't want to change the title, set this to the current title of the draft. */
  title: string;
  /** The type of content. Set this to `page`. */
  type: string;
  /** The status of the content. Set this to `current` or omit it altogether. */
  status?: string;
  /** The space for the content. */
  space?: {
    /** The key of the space */
    key: string;
  };
  /**
   * The new ancestor (i.e. parent page) for the content. If you have specified an ancestor, you must also specify a
   * `space` property in the request body for the space that the ancestor is in.
   *
   * Note, if you specify more than one ancestor, the last ID in the array will be selected as the parent page for the content.
   */
  ancestors?: {
    /** The content ID of the ancestor. */
    id: string;
  }[];
}
