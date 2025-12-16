import * as z from "zod";

const UserscriptMetaHeaderConfigSchema = z.object({
  /**
   * The name of the userscript, shown in userscript list and menus.
   * It must be unique within a {@link UserscriptMetaHeaderConfig.namespace `namespace`}.
   * If a userscript is being installed, and a userscript with the same {@link UserscriptMetaHeaderConfig.namespace `namespace`} and `name` already exists,
   * it will be replaced by the new one.
   * Creating a userscript with same {@link UserscriptMetaHeaderConfig.namespace `namespace`} and `name` will cause a conflict error.
   */
  name: z.string(),

  /**
   * The combination of `namespace` and {@link UserscriptMetaHeaderConfig.name `name`} is the unique identifier for a userscript.
   * `namespace` can be any string, for example the homepage of a group of userscripts by the same author.
   */
  namespace: z.string(),

  /**
   * Define rules to decide whether a userscript should be executed.
   *
   * See {@link https://violentmonkey.github.io/api/matching/ more about matching}.
   */
  match: z.union([z.string(), z.array(z.string())]),

  /**
   * Version of the userscript, it can be used to check if a userscript has new versions.
   * Read more about {@link https://semver.org semver}.
   */
  version: z.string(),

  /**
   * A brief summary to describe the userscript.
   */
  description: z.string(),

  /**
   * The userscript author.
   */
  author: z.optional(z.string()),

  /**
   * Userscript license.
   *
   * @example "MIT"
   */
  license: z.optional(z.string()),

  /**
   * Specify an icon for the userscript.
   */
  icon: z.optional(z.string()),

  /**
   * Specifies **when** the script will run.
   */
  "run-at": z.optional(
    z.literal([
      "document-start",
      "document-body",
      "document-end",
      "document-idle",
    ]),
  ),

  require: z.optional(z.array(z.string())),
  resource: z.optional(z.union([z.string(), z.array(z.string())])),

  grant: z.optional(z.array(z.string())),

  downloadURL: z.optional(z.string()),
  updateURL: z.optional(z.string()),

  supportURL: z.optional(z.string()),
  homepageURL: z.optional(z.string()),
});

type UserscriptMetaHeaderConfig = z.infer<
  typeof UserscriptMetaHeaderConfigSchema
>;

const UserscriptConfigSchema = z.object({
  /**
   * Userscript entrypoint
   *
   * @default "src/index.ts"
   */
  entryPoint: z.string().default("src/index.ts"),
  /**
   * Userscript output directory
   *
   * @default "dist"
   */
  outDir: z.string().default("dist"),
  /**
   * Clean output directory before build.
   *
   * @default true
   */
  clean: z.boolean().default(true),
  /**
   * {@link https://violentmonkey.github.io/api/metadata-block Metadata Block}
   */
  header: UserscriptMetaHeaderConfigSchema,
});

type UserscriptConfig = z.input<typeof UserscriptConfigSchema>;
type ResolvedUserscriptConfig = z.output<typeof UserscriptConfigSchema>;

export {
  UserscriptMetaHeaderConfigSchema,
  UserscriptConfigSchema,
  type UserscriptMetaHeaderConfig,
  type UserscriptConfig,
  type ResolvedUserscriptConfig,
};
