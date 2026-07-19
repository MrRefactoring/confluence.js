import { z } from 'zod';
import { PrincipalTypeSchema } from '../models';

export const GetAvailableSpaceRolesSchema = z.object({
  /**
   * The space ID for which to filter available space roles; if empty, return all available space roles for the
   * tenant.
   */
  spaceId: z.string().optional(),
  /** The space role type to filter results by. */
  roleType: z.string().optional(),
  /**
   * The principal ID to filter results by. If specified, a principal-type must also be specified. Paired with a
   * `principal-type` of `ACCESS_CLASS`, valid values include [`anonymous-users`, `jsm-project-admins`,
   * `authenticated-users`, `all-licensed-users`, `all-product-admins`]
   */
  principalId: z.string().optional(),
  /** The principal type to filter results by. If specified, a principal-id must also be specified. */
  principalType: PrincipalTypeSchema.optional(),
  /**
   * Used for pagination, this opaque cursor will be returned in the `next` URL in the `Link` response header. Use the
   * relative URL in the `Link` header to retrieve the `next` set of results.
   */
  cursor: z.string().optional(),
  /**
   * Maximum number of space roles to return. If more results exist, use the `Link` response header to retrieve a
   * relative URL that will return the next set of results.
   */
  limit: z.number().optional(),
});

export type GetAvailableSpaceRoles = z.input<typeof GetAvailableSpaceRolesSchema>;
