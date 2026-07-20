import { z } from 'zod';
import { LabelCreateSchema } from './labelCreate';

export const LabelCreateArraySchema = z.array(LabelCreateSchema);

export type LabelCreateArray = z.infer<typeof LabelCreateArraySchema>;
