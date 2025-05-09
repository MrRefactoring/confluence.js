import type { GenericLinks } from './genericLinks';

export interface SpaceSettings {
  /**
   * Defines whether an override for the space home should be used. This is used in conjunction with a space theme
   * provided by an app. For example, if this property is set to true, a theme can display a page other than the space
   * homepage when users visit the root URL for a space. This property allows apps to provide content-only theming
   * without overriding the space home.
   */
  routeOverrideEnabled: boolean;
  _links: GenericLinks;
}
