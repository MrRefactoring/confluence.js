import { z } from 'zod';
import { apiObject } from '@confluence.js/core';
/** The icon of the space */

export const SpaceIconSchema = apiObject({
  /**
   * The path (relative to base URL) at which the space's icon can be retrieved. The format should be like
   * `/wiki/download/...` or `/wiki/aa-avatar/...`
   */
  path: z.string().optional(),
  /**
   * The path (relative to base URL) that can be used to retrieve a link to download the space icon. 3LO apps should
   * use this link instead of the value provided in the `path` property to retrieve the icon.
   *
   * Currently this field is only returned for `global` spaces and not `personal` spaces.
   */
  apiDownloadLink: z.string().optional(),
});

export type SpaceIcon = z.infer<typeof SpaceIconSchema>;
