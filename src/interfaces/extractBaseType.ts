export type ExtractBaseType<T> = T extends (infer U)[] ? U : T;
