import { z } from 'zod';
import { apiObject } from '#/core';

export const ContainerSummarySchema = apiObject({
  title: z.string(),
  displayUrl: z.string(),
});

export type ContainerSummary = z.infer<typeof ContainerSummarySchema>;
