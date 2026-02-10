import { resolveConfig } from "~/config/resolve";
import { buildUserscript } from "~/core/build";
import { watchUserscript } from "~/core/build/watch";

async function build(options: { watch?: boolean }): Promise<void> {
  const { userscriptConfig, root } = await resolveConfig();

  const outDir = userscriptConfig.outDir;

  if (outDir === root || root.includes(outDir)) {
    throw new Error(
      "The outDir cannot be the root folder. Please build to a different folder.",
    );
  }

  if (!options.watch) {
    await buildUserscript(userscriptConfig, { write: true });
  }

  if (options.watch) {
    await watchUserscript(userscriptConfig);
  }
}

export { build };
