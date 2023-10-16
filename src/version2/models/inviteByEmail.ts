export interface InviteByEmail {
  /** List of emails invited to the site. */
  emailsInvited?: string[];
  /** List of invalid emails provided in the request. */
  emailsNotInvited?: {
    /** Email that was not invited. */
    key?: string;
    /** Reason why the email was not invited. */
    value?: string;
  };
}
