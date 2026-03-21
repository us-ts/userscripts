import * as path from "node:path";
import type { InputOptions, OutputOptions } from "rolldown";
import type { ResolvedUserscriptConfig } from "~/config/schema";
import { serializeMetaHeader } from "./meta-header";
import { userscriptPlugin } from "./plugin";

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
  options?: { write?: boolean; dev?: boolean },
): ResolvedOptions {
  const header = serializeMetaHeader(config.header);

  const USERSCRIPT_OUTPUT_FILE_NAME = "index.user.js";
  const outFile = path.join(config.outDir, USERSCRIPT_OUTPUT_FILE_NAME);

  return {
    input: config.entryPoint,
    tsconfig: true,
    plugins: [config.plugins, userscriptPlugin({ dev: options?.dev })],
    output: {
      format: "iife",
      sourcemap: false,
      minify: "dce-only",
      postBanner: `${header}\n`,
      cleanDir: config.clean,
      file: outFile,
    },
    transform: {
      define: { "process.env.NODE_ENV": `"${process.env.NODE_ENV}"` },
    },
    experimental: {
      attachDebugInfo: "none",
    },
    write: options?.write ?? false,
  };
}
