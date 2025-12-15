import * as z from "zod/mini";

const EnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string(),
  BASE_URL: z.url(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.url(),
});

export type Env = z.infer<typeof EnvSchema>;

const env = z.readonly(EnvSchema).parse(process.env);

export default env;
