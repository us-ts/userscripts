import * as rolldown from "rolldown";

import type { ResolvedUserscriptConfig } from "~/config/schema";

import { resolveOptions } from "./options";

async function buildUserscript(
  config: ResolvedUserscriptConfig,
  options?: { write?: boolean },
): Promise<string> {
  const result = await rolldown.build(resolveOptions(config, options));

  if (result.output.length !== 1) {
    throw new Error(`❌ Unexpected userscript build output`);
  }

  return result.output[0].code;
}

export { buildUserscript };
