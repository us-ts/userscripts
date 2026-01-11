import * as path from "node:path";
import * as z from "zod";
import {
  type ResolvedUserscriptConfig,
  type UserscriptConfig,
  UserscriptConfigSchema,
} from "./schema";

function resolveDir(dir: string, root: string) {
  let resolvedDir = path.resolve(root, dir);
  if (!resolvedDir.endsWith(path.sep)) {
    resolvedDir += path.sep;
  }
  return resolvedDir;
}

function createRelativeSchema(root: string) {
  const UserscriptConfigRelativeSchema = UserscriptConfigSchema.extend({
    outDir: z
      .string()
      .default("./dist")
      .transform((val) => resolveDir(val, root)),
  });

  return UserscriptConfigRelativeSchema;
}

export function validateConfig(
  config: unknown | UserscriptConfig,
  root: string,
): ResolvedUserscriptConfig {
  return createRelativeSchema(root).parse(config);
}
