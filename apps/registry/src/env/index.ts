import * as z from "zod/mini";

const VercelEnvSchema = z.object({
  VERCEL: z.literal(1),
  VERCEL_URL: z.url(),
});

const EnvSchema = z.object({
  REGISTRY_URL: z.url(),
  CLIENT_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.url(),
});

console.log(process.env);

const env = z
  .readonly(
    z.intersection(z.union([VercelEnvSchema, z.strictObject({})]), EnvSchema)
  )
  .parse(process.env);

export default env;
