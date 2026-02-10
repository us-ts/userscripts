import * as path from "node:path";
import type { InputOptions, OutputOptions } from "rolldown";
import type { ResolvedUserscriptConfig } from "~/config/schema";
import { serializeMetaHeader } from "./meta-header";

interface ResolvedOutputOptions extends OutputOptions {
  readonly file: string;
}

interface ResolvedOptions extends InputOptions {
  /** @default false */
  readonly write: boolean;
  readonly output: ResolvedOutputOptions;
}

export function resolveOptions(
  config: ResolvedUserscriptConfig,
  options?: { write?: boolean },
): ResolvedOptions {
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
