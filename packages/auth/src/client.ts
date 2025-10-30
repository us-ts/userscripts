import { createAuthClient } from "better-auth/solid";

type AuthClient = ReturnType<typeof createAuthClient>;

export const authClient: AuthClient = createAuthClient({
  baseURL: /* env.BASE_URL */ undefined,
});
