#!/usr/bin/env bun

async function main(): Promise<void> {
  const bunVersion = process.versions.bun;

  if (bunVersion) {
    try {
      const { semver } = await import("bun");
      const supportedBunVersion = ">=1.2.20";
      if (!semver.satisfies(bunVersion, supportedBunVersion)) {
        throw new Error("Unsupported Bun version. Please upgrade Bun.");
      }
    } catch {
      console.error("Unsupported Bun version. Please upgrade Bun.");
      throw new Error("Unsupported Bun version. Please upgrade Bun.");
    }
  } else {
    const version = parseInt(process.versions.node, 10) || 0;
    const minSupportedNodeVersion = 22;
    if (version < minSupportedNodeVersion) {
      throw new Error("Unsupported Node version. Please upgrade Node.\n");
    }
  }

  return import("../cli/index.js")
    .then(({ cli }) => cli(process.argv))
    .catch((error: unknown) => {
      console.error(error);
      process.exit(1);
    });
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
