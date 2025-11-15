import { buildUserscript } from "./build";

import { resolveConfig } from "../config";

export default async function build(): Promise<void> {
  const { userscriptConfig, root } = await resolveConfig();

  const outDir = userscriptConfig.outDir.toString();

  if (outDir === root.toString()) {
    throw new Error(
      "The outDir cannot be the root folder. Please build to a different folder."
    );
  }

  await buildUserscript(userscriptConfig);
}
