import type { RolldownPluginOption } from "rolldown";
import * as z from "zod";

const UserscriptMetaHeaderConfigSchema: z.ZodObject<{
  /**
   * The name of the userscript, shown in userscript list and menus.
   * It must be unique within a {@link UserscriptMetaHeaderConfig.namespace `namespace`}.
   * If a userscript is being installed, and a userscript with the same {@link UserscriptMetaHeaderConfig.namespace `namespace`} and `name` already exists,
   * it will be replaced by the new one.
   * Creating a userscript with same {@link UserscriptMetaHeaderConfig.namespace `namespace`} and `name` will cause a conflict error.
   */
  name: z.ZodString;

  /**
   * The combination of `namespace` and {@link UserscriptMetaHeaderConfig.name `name`} is the unique identifier for a userscript.
   * `namespace` can be any string, for example the homepage of a group of userscripts by the same author.
   */
  namespace: z.ZodString;

  /**
   * Define rules to decide whether a userscript should be executed.
   *
   * See {@link https://violentmonkey.github.io/api/matching/ more about matching}.
   */
  match: z.ZodUnion<readonly [z.ZodString, z.ZodArray<z.ZodString>]>;

  /**
   * Version of the userscript, it can be used to check if a userscript has new versions.
   * Read more about {@link https://semver.org semver}.
   */
  version: z.ZodString;

  /**
   * A brief summary to describe the userscript.
   */
  description: z.ZodString;

  /**
   * The userscript author.
   */
  author: z.ZodOptional<z.ZodString>;

  /**
   * Userscript license.
   *
   * @example "MIT"
   */
  license: z.ZodOptional<z.ZodString>;

  /**
   * Specify an icon for the userscript.
   */
  icon: z.ZodOptional<z.ZodString>;

  /**
   * Specifies **when** the script will run.
   */
  "run-at": z.ZodOptional<
    z.ZodLiteral<
      "document-start" | "document-body" | "document-end" | "document-idle"
    >
  >;
  require: z.ZodOptional<z.ZodArray<z.ZodString>>;
  resource: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
  grant: z.ZodOptional<z.ZodArray<z.ZodString>>;
  downloadURL: z.ZodOptional<z.ZodString>;
  updateURL: z.ZodOptional<z.ZodString>;
  supportURL: z.ZodOptional<z.ZodString>;
  homepageURL: z.ZodOptional<z.ZodString>;
}> = z.object({
  name: z.string(),
  namespace: z.string(),
  match: z.union([z.string(), z.array(z.string())]),
  version: z.string(),
  description: z.string(),
  author: z.optional(z.string()),
  license: z.optional(z.string()),
  icon: z.optional(z.string()),
  "run-at": z.optional(
    z.literal([
      "document-start",
      "document-body",
      "document-end",
      "document-idle",
    ]),
  ),

  require: z.optional(z.array(z.string())),
  resource: z.optional(z.record(z.string(), z.string())),

  grant: z.optional(z.array(z.string())),

  downloadURL: z.optional(z.string()),
  updateURL: z.optional(z.string()),

  supportURL: z.optional(z.string()),
  homepageURL: z.optional(z.string()),
});

type UserscriptMetaHeaderConfig = z.infer<
  typeof UserscriptMetaHeaderConfigSchema
>;

const UserscriptConfigSchema: z.ZodObject<{
  /**
   * Userscript entrypoint
   *
   * @default "src/index.ts"
   */
  entryPoint: z.ZodDefault<z.ZodString>;
  /**
   * Userscript output directory
   *
   * @default "dist"
   */
  outDir: z.ZodDefault<z.ZodString>;
  /**
   * Clean output directory before build.
   *
   * @default true
   */
  clean: z.ZodDefault<z.ZodBoolean>;
  /**
   * {@link https://violentmonkey.github.io/api/metadata-block Metadata Block}
   */
  header: typeof UserscriptMetaHeaderConfigSchema;
  plugins: z.ZodOptional<
    z.ZodCustom<RolldownPluginOption, RolldownPluginOption>
  >;
}> = z.object({
  entryPoint: z.string().default("src/index.ts"),
  outDir: z.string().default("dist"),
  clean: z.boolean().default(true),
  header: UserscriptMetaHeaderConfigSchema,
  plugins: z.custom<RolldownPluginOption>().optional(),
});

type UserscriptConfig = z.input<typeof UserscriptConfigSchema>;
type ResolvedUserscriptConfig = z.output<typeof UserscriptConfigSchema>;

export {
  UserscriptConfigSchema,
  type UserscriptMetaHeaderConfig,
  type UserscriptConfig,
  type ResolvedUserscriptConfig,
};
