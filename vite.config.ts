import path from 'path'
import react from '@vitejs/plugin-react'
import webfontDownload from 'vite-plugin-webfont-dl'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), webfontDownload()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
