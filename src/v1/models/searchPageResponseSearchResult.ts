import { z } from 'zod';
import { apiObject } from '#/core';
import { SearchResultSchema } from './searchResult';
import { GenericLinksSchema } from './genericLinks';

export const SearchPageResponseSearchResultSchema = apiObject({
  results: z.array(SearchResultSchema),
  start: z.number(),
  limit: z.number(),
  size: z.number(),
  totalSize: z.number(),
  cqlQuery: z.string(),
  searchDuration: z.number(),
  archivedResultCount: z.number().optional(),
  _links: GenericLinksSchema,
});

export type SearchPageResponseSearchResult = z.infer<typeof SearchPageResponseSearchResultSchema>;
