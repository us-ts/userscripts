import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    core: "src/core/index.ts",
    config: "src/config/index.ts",
    "bin/cli": "src/bin/cli.ts",
  },
  copy: { from: "src/types/*.d.ts", to: "dist" },
  exports: {
    enabled: true,
    customExports(pkg) {
      pkg["./types"] = "./virtual.d.ts";
      return pkg;
    },
  },
  hash: false,
  outputOptions: { minify: "dce-only", minifyInternalExports: false },
  dts: true,
});
