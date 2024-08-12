import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL} from "node:url";

const requestUrl = "http://127.0.0.1:5000/"

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    server: {
        cors: true,
        host: true,
        port: 3000,
        open: true,
        proxy: {
            "/api": {
                target: requestUrl,
                changeOrigin: true,
            },
        },
    },
})
