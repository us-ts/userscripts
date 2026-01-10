import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: {
      index: "src/config/index.ts",
      config: "src/config/index.ts",
    },
    exports: true,
    hash: false,
    outputOptions: { minify: "dce-only" },
    dts: true,
  },
  {
    entry: { "bin/cli": "src/bin/cli.ts" },
    exports: true,
    hash: false,
    dts: false,
    outputOptions: { minify: "dce-only" },
  },
]);
