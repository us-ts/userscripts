import * as fs from "node:fs/promises";
import * as path from "node:path";

import { pathToFileURL } from "node:url";

import * as z from "zod";

import type { ResolvedUserscriptConfig } from "./schema";

import { validateConfig } from "./validate";

const configPaths = Object.freeze([
  "userscript.config.ts",
  "userscript.config.js",
  "userscript.config.mts",
  "userscript.config.mjs",
]);

async function search(root: string) {
  const paths = configPaths.map((p) => path.join(root, p));

  for (const file of paths) {
    if (await fs.exists(file)) {
      return file;
    }
  }
}

async function resolveConfigPath(root: string): Promise<string | undefined> {
  const userConfigPath = await search(root);
  return userConfigPath;
}

async function loadConfig(root: string): Promise<unknown> {
  const configPath = await resolveConfigPath(root);
  if (!configPath) return {};

  try {
    const config = await import(
      `${pathToFileURL(configPath).toString()}?t=${Date.now()}`
    );
    return (config.default as unknown) ?? {};
  } catch (e) {
    console.error(`Unable to load your Userscript config\n`);
    throw e;
  }
}

interface ResolveConfigResult {
  userscriptConfig: ResolvedUserscriptConfig;
  root: string;
}

export async function resolveConfig(): Promise<ResolveConfigResult> {
  const root = process.cwd();
  const userConfig = await loadConfig(root);
  try {
    const userscriptConfig = validateConfig(userConfig, root);
    return { userscriptConfig, root };
  } catch (e) {
    if (e instanceof z.ZodError) {
      console.error(e);
    }
    throw e;
  }
}
