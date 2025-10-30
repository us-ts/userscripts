import { createAuthClient } from "better-auth/solid";

type AuthClient = ReturnType<typeof createAuthClient>;

const BASE_URL = "http://localhost:3000";

export const authClient: AuthClient = createAuthClient({
  baseURL: BASE_URL,
});
