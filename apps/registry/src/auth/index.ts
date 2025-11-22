import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

import { auth } from "~/lib/auth";

export default new Elysia()
  .use(
    cors({
      origin: auth.options.trustedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ request: { headers } }) {
        const session = await auth.api.getSession({ headers });
        return { authData: session, authApi: auth.api } as const;
      },
    },
  });
