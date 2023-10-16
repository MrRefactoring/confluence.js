import { BodyType } from './bodyType';

/** Contains fields for each representation type requested. */
export interface CustomContentBody {
  raw?: BodyType;
  storage?: BodyType;
  atlasDocFormat?: BodyType;
}
