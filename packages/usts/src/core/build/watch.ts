import * as rolldown from "rolldown";

import type { ResolvedUserscriptConfig } from "~/config/schema";

import { resolveOptions } from "./options";

function watchUserscript(config: ResolvedUserscriptConfig): void {
  const options = resolveOptions(config);
  rolldown.watch(options);
}

export { watchUserscript };
