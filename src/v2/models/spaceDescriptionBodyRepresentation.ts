import { z } from 'zod';
/** The formats a space description can be represented as. A subset of BodyRepresentation. */

export const SpaceDescriptionBodyRepresentationSchema = z.enum(['plain', 'view']);

export type SpaceDescriptionBodyRepresentation = z.infer<typeof SpaceDescriptionBodyRepresentationSchema>;
