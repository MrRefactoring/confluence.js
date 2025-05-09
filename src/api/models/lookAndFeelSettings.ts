import type { LookAndFeel } from './lookAndFeel';

export interface LookAndFeelSettings {
  selected: string;
  global: LookAndFeel;
  theme?: LookAndFeel;
  custom: LookAndFeel;
}
