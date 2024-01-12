import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environmentMatchGlobs: [['src/controllers/**.e2e.spec.ts', 'prisma']],
  },
});
