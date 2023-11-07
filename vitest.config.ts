import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";
/// <reference types="vitest" />
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: ["packages/template/*", "node_modules/**"],
      globals: true,
      environment: "jsdom",
    },
  })
);
