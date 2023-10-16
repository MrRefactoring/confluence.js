import { BodyType } from './bodyType';

/** Contains fields for each representation type requested. */
export interface Body {
  storage?: BodyType;
  atlasDocFormat?: BodyType;
}
