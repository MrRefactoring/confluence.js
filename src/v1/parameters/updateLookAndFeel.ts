import { z } from 'zod';
import { LookAndFeelSelectionSchema } from '../models';

export const UpdateLookAndFeelSchema = z.object(LookAndFeelSelectionSchema.shape);

export type UpdateLookAndFeel = z.input<typeof UpdateLookAndFeelSchema>;
