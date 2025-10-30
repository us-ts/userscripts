import {
  betterAuth,
  type BetterAuthOptions,
  type BetterAuthPlugin,
} from "better-auth";

import { prismaAdapter } from "better-auth/adapters/prisma";

import { apiKey, bearer, organization } from "better-auth/plugins";

import { passkey } from "better-auth/plugins/passkey";
import { oneTimeToken } from "better-auth/plugins/one-time-token";

import { prisma } from "@usts/db";

type Prisma = typeof prisma;

type OrganizationPlugin = ReturnType<
  typeof organization<Record<string, never>>
>;
type PasskeyPlugin = ReturnType<typeof passkey>;
type ApiKeyPlugin = ReturnType<typeof apiKey>;
type BearerPlugin = ReturnType<typeof bearer>;
type OneTimeTokenPlugin = ReturnType<typeof oneTimeToken>;

const plugins = [
  organization() as OrganizationPlugin,
  passkey() as PasskeyPlugin,
  apiKey() as ApiKeyPlugin,
  bearer({ requireSignature: true }) as BearerPlugin,
  oneTimeToken({ storeToken: "hashed" }) as OneTimeTokenPlugin,
] as const satisfies BetterAuthPlugin[];

type Plugins = typeof plugins;

const BASE_URL = "http://localhost:3000";

const authOptions = {
  secret: /* env.BETTER_AUTH_SECRET */ undefined,
  baseURL: BASE_URL,

  database: prismaAdapter(prisma as Prisma, {
    provider: "postgresql",
  }),

  socialProviders: {
    github: {
      clientId: /* env.GITHUB_CLIENT_ID */ undefined,
      clientSecret: /* env.GITHUB_CLIENT_SECRET */ undefined,
    },
  } as const,

  plugins: plugins as Plugins,
} as const satisfies BetterAuthOptions;

type AuthOptions = typeof authOptions;

type Auth = ReturnType<typeof betterAuth<AuthOptions>>;

export const auth: Auth = betterAuth(authOptions);
