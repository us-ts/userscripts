import * as path from "node:path";
import type { InputOptions, OutputOptions, Plugin } from "rolldown";
import type { ResolvedUserscriptConfig } from "~/config/schema";
import { serializeMetaHeader } from "./meta-header";

function userscriptPlugin(options?: { dev?: boolean }) {
  const id = "usts:runtime";
  const resolvedId = `\0${id}`;
  return {
    name: "userscript-plugin",
    resolveId(source) {
      if (source === id) {
        return resolvedId;
      }
      return null;
    },
    load(id) {
      if (id === resolvedId) {
        return `const IS_DEV = ${options?.dev ?? false};
        export { IS_DEV };`;
      }
      return null;
    },
  } satisfies Plugin;
}

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
