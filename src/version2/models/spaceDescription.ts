import { BodyType } from './bodyType';

/** Contains fields for each representation type requested. */
export interface SpaceDescription {
  plain: BodyType;
  view: BodyType;
}
