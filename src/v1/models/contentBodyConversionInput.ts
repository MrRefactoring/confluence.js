import { z } from 'zod';
import { apiObject } from '#/core';
import { ContentBodyCreateSchema } from './contentBodyCreate';

export const ContentBodyConversionInputSchema = apiObject({
  /** The name of the target format for the content body conversion. */
  to: z.string(),
  /**
   * Controls whether conversion results are cached and reused for identical requests.
   *
   * - `false`: Each request creates a new conversion task, even if an identical request was made previously.
   * - `true`: Enables caching behavior for identical requests from the same user.
   *
   *   - If no cached result exists, a new conversion task is created
   *   - If a cached result exists, the existing task is marked as RERUNNING and will complete with status COMPLETED
   *   - Returns the same task ID for identical requests, allowing you to retrieve the cached result
   */
  allowCache: z.boolean().optional(),
  /**
   * The space key used for resolving embedded content (page includes, files, and links) in the content body. For
   * example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>`
   * and the `spaceKeyContext=TEST` parameter is provided, then the link will be converted into a link to the "Example
   * page" page in the "TEST" space.
   */
  spaceKeyContext: z.string().optional(),
  /**
   * The content ID used to find the space for resolving embedded content (page includes, files, and links) in the
   * content body. For example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example
   * page" /><ac:link>` and the `contentIdContext=123` parameter is provided, then the link will be converted into a
   * link to the "Example page" page in the same space that has the content with ID=123. Note that `spaceKeyContext`
   * will be ignored if this parameter is provided.
   */
  contentIdContext: z.string().optional(),
  /**
   * Mode used for rendering embedded content, such as attachments. - `current` renders the embedded content using the
   * latest version. - `version-at-save` renders the embedded content using the version at the time of save.
   */
  embeddedContentRender: z.enum(['current', 'version-at-save']).optional(),
  /**
   * A multi-value, comma-separated parameter indicating which properties of the content to expand and populate. Expands
   * are dependent on the `to` conversion format and may be irrelevant for certain conversions (e.g.
   * `macroRenderedOutput` is redundant when converting to `view` format).
   *
   * If rendering to `view` format, and the body content being converted includes arbitrary nested content (such as
   * macros); then it is necessary to include webresource expands in the request. Webresources for content body are the
   * batched JS and CSS dependencies for any nested dynamic content (i.e. macros).
   *
   * - `embeddedContent` returns metadata for nested content (e.g. page included using page include macro)
   * - `mediaToken` returns JWT token for retrieving attachment data from Media API
   * - `macroRenderedOutput` additionally converts body to view format
   * - `webresource.superbatch.uris.js` returns all common JS dependencies as static URLs
   * - `webresource.superbatch.uris.css` returns all common CSS dependencies as static URLs
   * - `webresource.superbatch.uris.all` returns all common dependencies as static URLs
   * - `webresource.superbatch.tags.all` returns all common JS dependencies as html `<script>` tags
   * - `webresource.superbatch.tags.css` returns all common CSS dependencies as html `<style>` tags
   * - `webresource.superbatch.tags.js` returns all common dependencies as html `<script>` and `<style>` tags
   * - `webresource.uris.js` returns JS dependencies specific to conversion
   * - `webresource.uris.css` returns CSS dependencies specific to conversion
   * - `webresource.uris.all` returns all dependencies specific to conversion
   * - `webresource.tags.all` returns common JS dependencies as html `<script>` tags
   * - `webresource.tags.css` returns common CSS dependencies as html `<style>` tags
   * - `webresource.tags.js` returns common dependencies as html `<script>` and `<style>` tags
   */
  expand: z.array(z.string()).optional(),
  body: ContentBodyCreateSchema,
});

export type ContentBodyConversionInput = z.infer<typeof ContentBodyConversionInputSchema>;
