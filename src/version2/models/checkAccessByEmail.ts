export interface CheckAccessByEmail {
  /** List of emails that do not have access to site. */
  emailsWithoutAccess?: string[];
  /** List of invalid emails provided in the request. */
  invalidEmails?: string[];
}
