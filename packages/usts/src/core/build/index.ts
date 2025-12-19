import { buildUserscript } from "./build";

import { resolveConfig } from "~/config/resolve";

export default async function build(): Promise<void> {
  const { userscriptConfig, root } = await resolveConfig();

  const outDir = userscriptConfig.outDir;

  if (outDir === root || root.includes(outDir)) {
    throw new Error(
      "The outDir cannot be the root folder. Please build to a different folder.",
    );
  }

  await buildUserscript(userscriptConfig);
}
