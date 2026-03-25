import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Local dev: "/". Production (GitHub Pages): VITE_BASE="/super-inspect-demo/" — see .github/workflows.
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
