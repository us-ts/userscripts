import * as path from "node:path";
import type { BuildOptions } from "rolldown";
import type { ResolvedUserscriptConfig } from "~/config/schema";
import { serializeMetaHeader } from "./meta-header";

export function resolveOptions(
  config: ResolvedUserscriptConfig,
  options?: { write?: boolean },
): BuildOptions {
  const header = serializeMetaHeader(config.header);

  const USERSCRIPT_OUTPUT_FILE_NAME = "index.user.js";
  const outFile = path.join(config.outDir, USERSCRIPT_OUTPUT_FILE_NAME);

  return {
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
    write: options?.write ?? false,
  };
}
