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

type OrganizationPlugin = ReturnType<typeof organization>;
type PasskeyPlugin = ReturnType<typeof passkey>;
type ApiKeyPlugin = ReturnType<typeof apiKey>;
type BearerPlugin = ReturnType<typeof bearer>;
type OneTimeTokenPlugin = ReturnType<typeof oneTimeToken>;

const plugins = [
  organization(),
  // passkey() as PasskeyPlugin,
  apiKey() as ApiKeyPlugin,
  bearer({ requireSignature: true }) as BearerPlugin,
  oneTimeToken({ storeToken: "hashed" }) as OneTimeTokenPlugin,
] as const satisfies BetterAuthPlugin[];

type Plugins = typeof plugins;

const authOptions = {
  secret: /* env.BETTER_AUTH_SECRET */ undefined,
  baseURL: /* env.BASE_URL */ undefined,

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
