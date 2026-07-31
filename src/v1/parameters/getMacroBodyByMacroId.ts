import { z } from 'zod';

export const GetMacroBodyByMacroIdSchema = z.object({
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
});

export type GetMacroBodyByMacroId = z.input<typeof GetMacroBodyByMacroIdSchema>;
