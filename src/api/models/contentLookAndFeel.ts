import type { ContainerLookAndFeel } from './containerLookAndFeel';
import type { ScreenLookAndFeel } from './screenLookAndFeel';

export interface ContentLookAndFeel {
  screen: ScreenLookAndFeel;
  container: ContainerLookAndFeel;
  header: ContainerLookAndFeel;
  body: ContainerLookAndFeel;
}
