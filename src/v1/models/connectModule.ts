import type { z } from 'zod';
import { apiObject } from '#/core';
/**
 * A [Connect module](https://developer.atlassian.com/cloud/confluence/modules/admin-page/) in the same format as in
 * the* [app descriptor](https://developer.atlassian.com/cloud/confluence/app-descriptor/).
 */

export const ConnectModuleSchema = apiObject({});

export type ConnectModule = z.infer<typeof ConnectModuleSchema>;
