export interface GetUser {
  /** Userkey of the user to request from this resource */
  key?: string;
  /** Username of the user to request from this resource */
  username?: string;
  /** Properties to expand on the user */
  expand?: string;
}
