import { z } from 'zod';
import { AddContentRestrictionSchema } from './addContentRestriction';

export const AddContentRestrictionUpdateArraySchema = z.array(AddContentRestrictionSchema);

export type AddContentRestrictionUpdateArray = z.infer<typeof AddContentRestrictionUpdateArraySchema>;
