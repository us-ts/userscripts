import { $ } from "bun";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const outDir = ".vercel/output";
const funcDir = path.join(outDir, "functions", "index.func");
const staticDir = path.join(outDir, "static");
const entryJs = path.join(funcDir, "index.js");

async function main() {
  await fs.rm(outDir, { recursive: true, force: true });
  await fs.mkdir(funcDir, { recursive: true });
  await fs.mkdir(staticDir, { recursive: true });

  // Bundle a single ESM file for Node runtime (not --target bun)
  await $`bun build ./src/index.ts \
    --target=bun \
    --format=esm \
    --minify-syntax --minify-whitespace \
    --outfile ${entryJs}`;

  Bun.write(
    path.join(funcDir, ".vc-config.json"),
    JSON.stringify({
      runtime: "bun1.x",
      handler: "index.js",
      launcherType: "Bun",
      shouldAddHelpers: true,
    })
  );

  console.log("✅ Build Output API ready at .vercel/output");
}

main().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
