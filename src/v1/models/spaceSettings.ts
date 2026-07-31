import { z } from 'zod';
import { apiObject } from '#/core';
import { GenericLinksSchema } from './genericLinks';

export const SpaceSettingsSchema = apiObject({
  /**
   * Defines whether an override for the space home should be used. This is used in conjunction with a space theme
   * provided by an app. For example, if this property is set to true, a theme can display a page other than the space
   * homepage when users visit the root URL for a space. This property allows apps to provide content-only theming
   * without overriding the space home.
   */
  routeOverrideEnabled: z.boolean(),
  editor: apiObject({
    page: z.string(),
    blogpost: z.string(),
    default: z.string(),
  }).optional(),
  /**
   * The content rendering mode for the space. Controls spacing and typography in the editor and renderer. Valid values
   * are "standard" and "compact". When set to "compact", content is rendered more densely with smaller spacing and
   * typography.
   */
  contentMode: z.enum(['standard', 'compact']).nullish(),
  spaceKey: z.string().optional(),
  _links: GenericLinksSchema,
});

export type SpaceSettings = z.infer<typeof SpaceSettingsSchema>;
