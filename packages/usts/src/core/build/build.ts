import { rolldown } from "rolldown";

import * as path from "node:path";
import * as fs from "node:fs/promises";

import type { ResolvedUserscriptConfig } from "~/config/schema";

import { serializeMetaHeader } from "./meta-header";

const USERSCRIPT_OUTPUT_FILE_NAME = "index.user.js";

async function buildUserscript(
  config: ResolvedUserscriptConfig,
): Promise<void> {
  console.log("\n⚒️ Building userscript");

  const header = serializeMetaHeader(config.header).serializedHeader;

  const bundle = await rolldown({ input: config.entryPoint, tsconfig: true });
  const result = await bundle.generate({
    format: "iife",
    sourcemap: false,
    minify: "dce-only",
  });

  if (result.output.length !== 1) {
    throw new Error(`❌ Unexpected userscript build output`);
  }

  const bundledCode = result.output[0].code;
  const fullCode = `${header}\n\n${bundledCode}` as const;

  const outDir = config.outDir;
  if (config.clean) {
    console.log("\n🧹 Cleaning output directory");
    await fs.rm(outDir, { recursive: true, force: true });
  }
  await fs.mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, USERSCRIPT_OUTPUT_FILE_NAME);
  await fs.writeFile(outFile, fullCode, "utf-8");
  console.log("\n🎉 Build process complete!");
}

export { buildUserscript };
