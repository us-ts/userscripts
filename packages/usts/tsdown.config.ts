import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    config: "src/config/index.ts",
    "bin/cli": "src/bin/cli.ts",
  },
  exports: true,
  unbundle: true,
  dts: true,
});
