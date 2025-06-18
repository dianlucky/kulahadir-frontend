import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//@ts-ignore
import path from 'path';
//@ts-ignore
import url from 'url';
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
var __filename = url.fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
