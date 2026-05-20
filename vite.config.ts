import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";
import path from "path";
import apiDevPlugin from "./api/dev";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load .env files (no prefix filter) and forward server-only vars into
  // process.env so the api/* handlers — which run in the same Node process
  // as the Vite dev server — can read them. Vite's default behavior only
  // exposes VITE_* vars to the client bundle and does not populate
  // process.env at all. Vercel handles this natively in production.
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of ["GITHUB_TOKEN", "GITHUB_USERNAME"]) {
    if (env[key] && !process.env[key]) {
      process.env[key] = env[key];
    }
  }

  return {
    server: {
      host: "::",
      port: 3000,
    },
    plugins: [
      react(),
      apiDevPlugin(),
      imagetools({
        // The default include pattern only matches lowercase extensions, but
        // our photo assets are .JPG straight from the camera. Broaden it so
        // both cases run through sharp.
        include: /^[^?]+\.(avif|gif|heif|jpeg|jpg|png|tiff|webp|JPG|JPEG|PNG)\?.*$/,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
