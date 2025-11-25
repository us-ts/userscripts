import { Elysia } from "elysia";

import auth from "~/auth";

export default new Elysia({ prefix: "/userscripts" })
  .use(auth)
  .get("/", ({ path }) => ({ path }))
  .post(
    "/",
    async ({ authData, authApi, headers, status }) => {
      if (!authData) {
        return status("Unauthorized");
      }
      const sessions = await authApi.listSessions({ headers });
      return { method: "POST", authData, sessions };
    },
    { auth: true }
  );
