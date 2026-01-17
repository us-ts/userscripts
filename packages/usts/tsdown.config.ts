import { defineConfig, type UserConfig } from "tsdown";

function defineEntryPoint({
  entry,
  dts = true,
}: {
  entry: Record<string, string>;
  dts?: boolean;
}) {
  return {
    entry,
    exports: true,
    hash: false,
    outputOptions: { minify: "dce-only" },
    dts,
  } satisfies UserConfig;
}

export default defineConfig([
  defineEntryPoint({
    entry: {
      index: "src/config/index.ts",
      config: "src/config/index.ts",
    },
  }),
  defineEntryPoint({
    entry: { "bin/cli": "src/bin/cli.ts" },
    dts: false,
  }),
]);
