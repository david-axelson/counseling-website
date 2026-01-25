import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: './', // Use relative paths for assets so it works on GitHub Pages sub-directories
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                legal: resolve(__dirname, 'legal.html'),
            },
        },
    },
})
