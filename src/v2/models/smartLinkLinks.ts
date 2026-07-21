import { z } from 'zod';
import { apiObject } from '#/core';

export const SmartLinkLinksSchema = apiObject({
  /** Web UI link of the content. */
  webui: z.string().optional(),
  /** Base URL of the Confluence site. */
  base: z.string().optional(),
  /** Link to the restrictions grouped by operation. */
  byOperation: z.string().optional(),
  /** Link to the collection this entity belongs to. */
  collection: z.string().optional(),
  /** Context path of the Confluence site. */
  context: z.string().optional(),
  /** Download link for the content. */
  download: z.string().optional(),
  /** Edit UI link of the content. */
  editui: z.string().optional(),
  /** Edit UI (v2 editor) link of the content. */
  edituiv2: z.string().optional(),
  /** Relative URL of the next page of results. */
  next: z.string().optional(),
  /** Relative URL of the previous page of results. */
  prev: z.string().optional(),
  /** Canonical link to this entity. */
  self: z.string().optional(),
  /** Short web UI link of the content. */
  tinyui: z.string().optional(),
});

export type SmartLinkLinks = z.infer<typeof SmartLinkLinksSchema>;
