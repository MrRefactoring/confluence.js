export interface GetMembersByQueryParam {
  /** The name of the group to be queried for its members. */
  name: string;
  /** The starting index of the returned users. */
  start?: number;
  /** The maximum number of users to return per page.
   Note, this is restricted by fixed system limit of 200 which is to say if the limit parameter
   exceeds 200, this API will return a maximum of 200 users per page. */
  limit?: number;
}
