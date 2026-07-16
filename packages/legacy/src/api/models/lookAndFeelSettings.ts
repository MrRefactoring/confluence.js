import type { LookAndFeel } from './lookAndFeel.js';

export interface LookAndFeelSettings {
  selected: string;
  global: LookAndFeel;
  theme?: LookAndFeel;
  custom: LookAndFeel;
}
