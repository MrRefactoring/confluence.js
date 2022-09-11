export interface MovePage {
  /** The ID of the page to be moved */
  pageId?: string;
  /** @deprecated The ID of the page to be moved */
  id?: string;
  /**
   * The position to move the page to relative to the target page:
   *
   * - `before` - move the page under the same parent as the target, before the target in the list of children
   * - `after` - move the page under the same parent as the target, after the target in the list of children
   * - `append` - move the page to be a child of the target
   */
  position: 'before' | 'after' | 'append' | string;
  /** The ID of the target page for this operation */
  targetId: string;
}
