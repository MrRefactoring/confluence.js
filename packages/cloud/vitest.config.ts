import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
import { defineConfig, mergeConfig } from 'vitest/config';
import { vitestShared } from '../../vitestShared';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

export default defineConfig(({ mode }) =>
  mergeConfig(
    vitestShared,
    defineConfig({
      resolve: {
        alias: {
          '#/': `${resolve(__dirname, 'src')}/`,
          '@confluence.js/cloud': resolve(__dirname, 'src/index.ts'),
        },
      },
      test: {
        name: 'cloud',
        root: __dirname,
        include: ['tests/**/*.test.ts'],
        env: loadEnv(mode, repoRoot, ''),
        // Live suites hit a single shared Confluence Cloud site: run every test
        // file serially in one worker ("queued") so suites never race each other
        // for rate limits or step on shared state. The global setup sweeps any
        // marker-tagged spaces a crashed run left behind.
        globalSetup: ['./tests/integration/setup/globalSetup.ts'],
        fileParallelism: false,
      },
    }),
  ),
);
