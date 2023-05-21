export namespace UtilityTypes {
  /** Mark some properties which only the former including as optional and set the value to never */
  export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /** Get the XOR type which could make 2 types exclude each other */
  export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

  /** Get the XOR type which could make 3 types exclude each other */
  export type XOR3<T, U, V> = XOR<T, XOR<U, V>>;

  /** Get the XOR type which could make 4 types exclude each other */
  export type XOR4<T, U, V, W> = XOR<T, XOR3<U, V, W>>;

  export type MarkRequired<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> & Required<Pick<T, K>>;
}
