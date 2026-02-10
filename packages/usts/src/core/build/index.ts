import * as rolldown from "rolldown";

import type { ResolvedUserscriptConfig } from "~/config/schema";

import { resolveOptions } from "./options";

async function buildUserscript(
  config: ResolvedUserscriptConfig,
  options?: { write?: boolean },
): Promise<string> {
  const buildOptions = resolveOptions(config, options);
  const result = await rolldown.build(buildOptions);

  if (result.output.length !== 1) {
    throw new Error(`❌ Unexpected userscript build output`);
  }

  return result.output[0].code;
}

export { buildUserscript };
