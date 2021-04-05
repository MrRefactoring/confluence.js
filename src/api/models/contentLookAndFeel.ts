import { ScreenLookAndFeel } from './screenLookAndFeel';
import { ContainerLookAndFeel } from './containerLookAndFeel';

export interface ContentLookAndFeel {
  screen: ScreenLookAndFeel;
  container: ContainerLookAndFeel;
  header: ContainerLookAndFeel;
  body: ContainerLookAndFeel;
}
