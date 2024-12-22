import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()] as any[],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
  },
  test: {
    environment: "happy-dom",
    include: ["tests/**/*.spec.ts"],
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
});
