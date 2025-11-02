import { createAuthClient } from "better-auth/solid";
import type { BetterAuthClientOptions } from "better-auth/client";

type AuthClient = ReturnType<typeof createAuthClient>;

export const authClient: AuthClient = createAuthClient({
  baseURL: process.env.REGISTRY_URL,
} satisfies BetterAuthClientOptions);
