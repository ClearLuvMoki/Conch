import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async () => ({
    plugins: [react()],

    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    //
    // 1. prevent vite from obscuring rust errors
    clearScreen: false,
    // 2. tauri expects a fixed port, fail if that port is not available
    server: {
        port: 1420,
        strictPort: true,
    },
    resolve: {
        alias: {
            '@/constant': path.join(__dirname, './constant'),
            '@/src': path.join(__dirname, './src'),
            '@/Utils': path.join(__dirname, './Utils'),
            '@/Components': path.join(__dirname, './src/Components'),
            '@/Layout': path.join(__dirname, './src/Layout'),
            '@/Pages': path.join(__dirname, './src/Pages'),
            '@/Router': path.join(__dirname, './src/Router'),
        },
        extensions: ['.*', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.app/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
}));
