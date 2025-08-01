import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import url from "url";

import tailwindcss from "@tailwindcss/vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
