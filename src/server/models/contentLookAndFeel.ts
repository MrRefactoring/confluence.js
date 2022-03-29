import { ContainerLookAndFeel } from './containerLookAndFeel';
import { ScreenLookAndFeel } from './screenLookAndFeel';

export interface ContentLookAndFeel {
  screen: ScreenLookAndFeel;
  container: ContainerLookAndFeel;
  header: ContainerLookAndFeel;
  body: ContainerLookAndFeel;
}
