import { createAuthClient } from "better-auth/solid";

export const authClient = createAuthClient({
  baseURL: /* env.BASE_URL */ undefined,
});
