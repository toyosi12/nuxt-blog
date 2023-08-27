import { defineConfig } from "vitest/config";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import tsconfigPaths from "vite-tsconfig-paths";
export default defineConfig({
  plugins: [Vue(), AutoImport({ imports: ["vue"] }), tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
