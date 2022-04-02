export interface ContentState {
  /** Identifier of content state. If 0, 1, or 2, this is a default space state */
  id: number;
  /** Name of content state. */
  name: string;
  /** Hex string representing color of state */
  color: string;
}
