import { LookAndFeel } from './lookAndFeel';

/**
 * Look and feel settings returned after an update.
 */
export interface LookAndFeelUpdated extends LookAndFeel {
  _links: Record<string, any>;
}
