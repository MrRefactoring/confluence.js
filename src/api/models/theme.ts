/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ThemeNoLinks } from './themeNoLinks';

export interface Theme extends ThemeNoLinks {
  _links: Record<string, any>;
}
