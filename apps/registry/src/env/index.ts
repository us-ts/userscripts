import * as z from "zod/mini";

const domainToUrlSchema = z.pipe(
  z.pipe(
    z.string(),
    z.transform((val) => `https://${val}`)
  ),
  z.url()
);

const VercelEnvSchema = z.object({
  VERCEL: z.literal(1),
  VERCEL_URL: domainToUrlSchema,
});

const EnvSchema = z.object({
  REGISTRY_URL: z.url(),
  CLIENT_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  DATABASE_URL: z.url(),
});

export type Env = z.infer<typeof EnvSchema>;

const env = z
  .intersection(
    z.union([z.readonly(VercelEnvSchema), z.object({})]),
    z.readonly(EnvSchema)
  )
  .parse(process.env);

export default env;
