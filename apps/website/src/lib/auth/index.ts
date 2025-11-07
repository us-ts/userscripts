import { createAuthClient } from "better-auth/solid";
import type { BetterAuthClientOptions } from "better-auth/client";

import { REGISTRY_URL } from "astro:env/client";

type AuthClient = ReturnType<typeof createAuthClient>;

export const authClient: AuthClient = createAuthClient({
  baseURL: REGISTRY_URL,
} satisfies BetterAuthClientOptions);
