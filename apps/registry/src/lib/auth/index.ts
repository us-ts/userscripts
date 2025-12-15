import { betterAuth, type BetterAuthOptions } from "better-auth";

import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { apiKey, bearer, organization } from "better-auth/plugins";

import { passkey } from "@better-auth/passkey";

import { oneTimeToken } from "better-auth/plugins/one-time-token";

import db from "~/db/index";
import env from "~/env/index";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BASE_URL,

  database: drizzleAdapter(db, { provider: "pg" }),

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [
    organization(),
    passkey(), // https://www.better-auth.com/docs/plugins/passkey#addregister-a-passkey
    apiKey(), // https://www.better-auth.com/docs/plugins/api-key#create-an-api-key
    bearer({ requireSignature: true }),
    oneTimeToken({ storeToken: "hashed" }),
  ],
} as const satisfies BetterAuthOptions);
