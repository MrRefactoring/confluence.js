import type { ContainerLookAndFeel } from './containerLookAndFeel.js';
import type { ScreenLookAndFeel } from './screenLookAndFeel.js';

export interface ContentLookAndFeel {
  screen: ScreenLookAndFeel;
  container: ContainerLookAndFeel;
  header: ContainerLookAndFeel;
  body: ContainerLookAndFeel;
}
