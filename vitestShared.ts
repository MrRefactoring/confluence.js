export const vitestShared = {
  test: {
    environment: 'node' as const,
    coverage: {
      provider: 'v8' as const,
      reporter: ['text', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      reportOnFailure: true,
      all: true,
      include: ['packages/*/src/**/*.ts'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/*.d.ts',
        '**/tests/**',
        '**/*.config.*',
        // Generated Zod schema/type containers — pure declarations, no runtime branching.
        '**/models/**',
        '**/parameters/**',
        // Barrel re-exports — zero logic.
        '**/index.ts',
      ],
    },
  },
};
