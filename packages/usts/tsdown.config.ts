import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    core: "src/core/index.ts",
    config: "src/config/index.ts",
    "bin/cli": "src/bin/cli.ts",
  },
  exports: true,
  hash: false,
  outputOptions: { minify: "dce-only", minifyInternalExports: false },
  dts: true,
});
