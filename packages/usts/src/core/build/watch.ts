import * as rolldown from "rolldown";

import type { ResolvedUserscriptConfig } from "#config/schema";

import { resolveOptions } from "./options";
import { serve } from "./serve";

async function watchUserscript(
  config: ResolvedUserscriptConfig,
  options?: { port?: number },
): Promise<void> {
  const USERSCRIPT_OUTPUT_FILE_NAME = "index.user.js";
  const watchOptions = resolveOptions(config, { dev: true });
  rolldown.watch(watchOptions);
  await serve({
    port: options?.port ?? 3000,
    outDir: config.outDir,
    fileName: USERSCRIPT_OUTPUT_FILE_NAME,
  });
}

export { watchUserscript };
