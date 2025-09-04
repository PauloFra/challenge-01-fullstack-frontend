import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "users",
      filename: "remoteEntry.js",
      exposes: {
        "./UsersPage": "./src/components/UsersPage",
        "./remoteTypes": "./src/types/index",
      },
      shared: ["react", "react-dom", "@mui/material"],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 8081,
  },
  preview: {
    port: 8081,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
  },
});
