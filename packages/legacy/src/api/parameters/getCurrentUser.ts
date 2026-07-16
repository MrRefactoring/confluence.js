export interface GetCurrentUser {
  /**
   * A multi-value parameter indicating which properties of the user to expand.
   *
   * - `operations` returns the operations that the user is allowed to do.
   * - PersonalSpace returns the user's personal space, if it exists.
   * - `isExternalCollaborator` returns whether the user is an external collaborator user
   */
  expand?: string[];
}
