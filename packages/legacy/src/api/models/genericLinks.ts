/* eslint-disable @typescript-eslint/no-explicit-any */
export type GenericLinks = Record<string, any> & {
  self: string;
  next?: string;
  tinyui?: string;
  editui?: string;
  webui?: string;
  base?: string;
  context?: string;
  download?: string;
};
