/**
 * The user or group that the permission applies to. */
export interface PermissionSubject {
  type: string;
  /** for `type=user`, identifier should be user's accountId or `anonymous` for anonymous users

    for `type=group`, identifier should be name of the group or groupId */
  identifier: string;
}
