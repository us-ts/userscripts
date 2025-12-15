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
  await $`bun build src/index.ts \
    --target=node \
    --format=esm \
    --minify-syntax --minify-whitespace \
    --outfile ${entryJs}`;

  // Make Node treat index.js as ESM inside the function mount
  Bun.write(
    path.join(funcDir, "package.json"),
    JSON.stringify({ type: "module" }, null, 2),
  );

  // Function runtime config
  Bun.write(
    path.join(funcDir, ".vc-config.json"),
    JSON.stringify(
      {
        runtime: "nodejs22.x",
        handler: "index.js",
        launcherType: "Nodejs",
        shouldAddHelpers: true,
      },
      null,
      2,
    ),
  );

  // Routes: static first, then all to the function
  Bun.write(
    path.join(outDir, "config.json"),
    JSON.stringify(
      {
        version: 3,
        routes: [{ handle: "filesystem" }, { src: "/(.*)", dest: "/index" }],
      },
      null,
      2,
    ),
  );

  console.log("✅ Build Output API ready at .vercel/output");
}

main().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
