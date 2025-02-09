import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: 'happy-dom',
        include: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
        setupFiles: ['./tests/setupTest.ts']
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname)
        }
    }
})