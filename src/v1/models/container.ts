import type { z } from 'zod';
import { apiObject } from '#/core';
/**
 * Container for content. This can be either a space (containing a page or blogpost)* or a page/blog post (containing an
 * attachment or comment)
 */

export const ContainerSchema = apiObject({});

export type Container = z.infer<typeof ContainerSchema>;
