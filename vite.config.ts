import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import apiDevPlugin from "./api/dev";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
  },
  plugins: [react(), apiDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
