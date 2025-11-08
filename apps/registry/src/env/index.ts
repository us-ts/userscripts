import * as z from "zod/mini";

const EnvSchema = z.object({
  REGISTRY_URL: z.url(),
  CLIENT_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.url(),
});

const env = z.readonly(EnvSchema).parse(process.env);

export default env;
