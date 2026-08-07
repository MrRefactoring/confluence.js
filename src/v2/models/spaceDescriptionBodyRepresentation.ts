import type { z } from 'zod';
import { openEnum } from '#/core';
/** The formats a space description can be represented as. A subset of BodyRepresentation. */

export const SpaceDescriptionBodyRepresentationSchema = openEnum(['plain', 'view']);

export type SpaceDescriptionBodyRepresentation = z.infer<typeof SpaceDescriptionBodyRepresentationSchema>;
