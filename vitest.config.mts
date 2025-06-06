import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    typecheck: {
      enabled: true,
      tsconfig: 'tsconfig.lint.json',
    },
    setupFiles: ['dotenv/config'],
  },
  resolve: {
    alias: {
      '~': new URL('./src', import.meta.url).pathname,
      '@tests': new URL('./tests', import.meta.url).pathname,
    },
  },
});
