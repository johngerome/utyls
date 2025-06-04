import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/ok.ts", "src/error.ts", "src/safe.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
