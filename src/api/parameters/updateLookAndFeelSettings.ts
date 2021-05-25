import { LookAndFeel } from '../models';

export interface UpdateLookAndFeelSettings extends LookAndFeel {
  /**
   * The key of the space for which the look and feel settings will be updated. If this is not set, the global look and
   * feel settings will be updated.
   */
  spaceKey?: string;
}
