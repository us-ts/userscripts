import { fileURLToPath } from "bun";
import type {
  ResolvedUserscriptConfig,
  UserscriptMetaHeaderConfig,
} from "../../src/config/schema";
import { UserscriptConfigSchema } from "../../src/config/schema";

export function resolveFixture(
  entryPoint: string,
  header?: Partial<UserscriptMetaHeaderConfig>,
): ResolvedUserscriptConfig {
  return UserscriptConfigSchema.decode({
    entryPoint: fileURLToPath(new URL(`../${entryPoint}`, import.meta.url)),
    header: {
      name: "Userscript name",
      namespace: "fixtures",
      description: "Userscript description",
      match: "https://example.com/*",
      version: "1.0.0",
      ...header,
    },
  });
}
