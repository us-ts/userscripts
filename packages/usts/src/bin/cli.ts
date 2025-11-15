#!/usr/bin/env bun
"use strict";

const minSupportedNodeVersion = 22;
const supportedBunVersion = ">=1.2.20";

async function main() {
  const bunVersion = process.versions.bun;

  if (bunVersion) {
    try {
      const { semver } = await import("bun");
      if (!semver.satisfies(bunVersion, supportedBunVersion)) {
        throw new Error("Unsupported Bun version. Please upgrade Bun.");
      }
    } catch {
      console.error("Unsupported Bun version. Please upgrade Bun.");
      throw new Error("Unsupported Bun version. Please upgrade Bun.");
    }
  } else {
    const version = parseInt(process.versions.node) || 0;
    if (version < minSupportedNodeVersion) {
      throw new Error("Unsupported Node version. Please upgrade Node.\n");
    }
  }

  return import("../cli/index.js")
    .then(({ cli }) => cli(process.argv))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
