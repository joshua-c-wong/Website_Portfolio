import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// GitHub Pages serves the site from /<repo>/; everywhere else (local, Lovable) it's /
const base = process.env.GITHUB_PAGES === "true" ? "/Website_Portfolio/" : "/";

export default defineConfig({
  base,
  server: { host: "::", port: 8080 },
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1200 }, // three.js lives in its own lazy chunk
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
