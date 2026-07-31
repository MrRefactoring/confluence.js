import { z } from 'zod';

export const GetAndConvertMacroBodyByMacroIdSchema = z.object({
  /** The ID for the content that contains the macro. */
  id: z.string(),
  /**
   * The version of the content that contains the macro. Specifying `0` as the `version` will return the macro body for
   * the latest content version.
   */
  version: z.number(),
  /**
   * The ID of the macro. This is usually passed by the app that the macro is in. Otherwise, find the macro ID by
   * querying the desired content and version, then expanding the body in storage format. For example,
   * '/content/196611/version/7?expand=content.body.storage'.
   */
  macroId: z.string(),
  /** The content representation to return the macro in. */
  to: z.string(),
  /**
   * A multi-value parameter indicating which properties of the content to expand and populate. Expands are dependent on
   * the `to` conversion format and may be irrelevant for certain conversions (e.g. `macroRenderedOutput` is redundant
   * when converting to `view` format).
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
  /**
   * The space key used for resolving embedded content (page includes, files, and links) in the content body. For
   * example, if the source content contains the link `<ac:link><ri:page ri:content-title="Example page" /><ac:link>`
   * and the `spaceKeyContext=TEST` parameter is provided, then the link will be converted to a link to the "Example
   * page" page in the "TEST" space.
   */
  spaceKeyContext: z.string().optional(),
  /**
   * Mode used for rendering embedded content, like attachments.
   *
   * - `current` renders the embedded content using the latest version.
   * - `version-at-save` renders the embedded content using the version at the time of save.
   */
  embeddedContentRender: z.enum(['current', 'version-at-save']).optional(),
});

export type GetAndConvertMacroBodyByMacroId = z.input<typeof GetAndConvertMacroBodyByMacroIdSchema>;
