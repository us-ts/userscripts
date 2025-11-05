import { betterAuth, type BetterAuthOptions } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";

import { apiKey, bearer, organization } from "better-auth/plugins";

import { passkey } from "better-auth/plugins/passkey";
import { oneTimeToken } from "better-auth/plugins/one-time-token";

import { prisma } from "~/db";

import env from "~/env";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.REGISTRY_URL,

  database: prismaAdapter(prisma, { provider: "postgresql" }),

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },

  plugins: [
    organization(),
    passkey(),
    apiKey(),
    bearer({ requireSignature: true }),
    oneTimeToken({ storeToken: "hashed" }),
  ],
} as const satisfies BetterAuthOptions);
