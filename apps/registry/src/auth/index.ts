import { Elysia } from "elysia";

import { auth } from "~/lib/auth/index";

export default new Elysia().mount(auth.handler).macro({
  auth: {
    async resolve({ request: { headers } }) {
      const session = await auth.api.getSession({ headers });
      return { authData: session, authApi: auth.api } as const;
    },
  },
});
