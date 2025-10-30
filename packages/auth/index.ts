import { betterAuth, type BetterAuthOptions } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";

import { apiKey, bearer } from "better-auth/plugins";

import { passkey } from "better-auth/plugins/passkey";
import { oneTimeToken } from "better-auth/plugins/one-time-token";

import { prisma as db } from "@usts/db";

export const auth = betterAuth({
  secret: /* env.BETTER_AUTH_SECRET */ undefined,
  baseURL: /* env.BASE_URL */ undefined,

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  socialProviders: {
    github: {
      clientId: /* env.GITHUB_CLIENT_ID */ undefined,
      clientSecret: /* env.GITHUB_CLIENT_SECRET */ undefined,
    },
  },

  plugins: [
    passkey(),
    apiKey(),
    bearer({ requireSignature: true }),
    oneTimeToken({ storeToken: "hashed" }),
  ],
} satisfies BetterAuthOptions);
