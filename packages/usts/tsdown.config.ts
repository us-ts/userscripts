import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    core: "src/core/index.ts",
    config: "src/config/index.ts",
    cli: "src/cli/index.ts",
  },
  copy: { from: "src/types/*.d.ts", to: "dist" },
  exports: {
    enabled: true,
    bin: true,
    customExports(pkg) {
      pkg["./types"] = "./dist/virtual.d.ts";
      return pkg;
    },
  },
  hash: false,
  outputOptions: { minify: "dce-only", minifyInternalExports: false },
  dts: true,
});
