import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), alias()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      external: ["./src/__tests__/**"],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
