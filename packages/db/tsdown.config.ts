import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  external: (id) => {
    if (id.includes("/generated/")) return true;
  },
  exports: true,
});
