export interface GetMacroBodyByMacroId {
  /** The ID for the content that contains the macro. */
  id: string;
  /** The version of the content that contains the macro. */
  version: number;
  /** The ID of the macro. This is usually passed by the app that the
   macro is in. Otherwise, find the macro ID by querying the desired
   content and version, then expanding the body in storage format.
   For example, '/content/196611/version/7?expand=content.body.storage'. */
  macroId: string;
}
