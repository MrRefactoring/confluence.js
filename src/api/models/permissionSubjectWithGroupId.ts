/**
 * The user or group that the permission applies to. */
export interface PermissionSubjectWithGroupId {
  type: string;
  /** for `type=user`, identifier should be user's accountId or `anonymous` for anonymous users

    for `type=group`, identifier should be ID of the group */
  identifier: string;
}
