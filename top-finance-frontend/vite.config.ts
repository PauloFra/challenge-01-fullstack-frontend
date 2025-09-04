import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "finance",
      filename: "remoteEntry.js",
      exposes: {
        "./FinancePage": "./src/components/FinancePage",
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
    port: 8082,
  },
  preview: {
    port: 8082,
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
