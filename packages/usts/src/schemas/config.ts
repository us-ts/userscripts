import { z } from "zod";

const UserscriptMetaHeaderConfigSchema = z.object({
  name: z.string(),
  namespace: z.string(),

  version: z.string(),
  description: z.string(),

  author: z.optional(z.string()),
  license: z.optional(z.string()),

  match: z.union([z.string(), z.array(z.string())]),

  icon: z.optional(z.string()),

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
  entryPoint: z.string(),
  outDir: z.string(),
  header: UserscriptMetaHeaderConfigSchema,
});

type UserscriptConfig = z.infer<typeof UserscriptConfigSchema>;

export {
  UserscriptMetaHeaderConfigSchema,
  UserscriptConfigSchema,
  type UserscriptMetaHeaderConfig,
  type UserscriptConfig,
};
