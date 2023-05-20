import { Body } from './body';

export interface VersionedEntity {
  /** Title of the entity. */
  title: string;
  /** ID of the entity. */
  id: string;
  body: Body;
}
