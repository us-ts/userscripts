import * as path from "node:path";

import * as rolldown from "rolldown";

import type { ResolvedUserscriptConfig } from "~/config/schema";

import { serializeMetaHeader } from "./meta-header";

const USERSCRIPT_OUTPUT_FILE_NAME = "index.user.js";

async function buildUserscript(
  config: ResolvedUserscriptConfig,
  options?: { write?: boolean },
): Promise<string> {
  const header = serializeMetaHeader(config.header);

  const outDir = config.outDir;
  const outFile = path.join(outDir, USERSCRIPT_OUTPUT_FILE_NAME);

  const result = await rolldown.build({
    input: config.entryPoint,
    tsconfig: true,
    plugins: [config.plugins],
    output: {
      format: "iife",
      sourcemap: false,
      minify: "dce-only",
      postBanner: `${header}\n`,
      cleanDir: config.clean,
      file: outFile,
    },
    write: options?.write,
  });

  if (result.output.length !== 1) {
    throw new Error(`❌ Unexpected userscript build output`);
  }

  return result.output[0].code;
}

export { buildUserscript };
