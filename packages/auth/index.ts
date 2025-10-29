import { betterAuth, type BetterAuthOptions } from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "@usts/db";

export const auth = betterAuth({
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BASE_URL,

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
} satisfies BetterAuthOptions);
