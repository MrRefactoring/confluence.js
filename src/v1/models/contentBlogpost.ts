import type { z } from 'zod';
import { apiObject } from '#/core';
/** Representation of a blogpost (content) */

export const ContentBlogpostSchema = apiObject({});

export type ContentBlogpost = z.infer<typeof ContentBlogpostSchema>;
