import { Elysia } from "elysia";
import type { APIRoute } from "astro";

import router from "~/router/index";

const app = new Elysia({ prefix: "/api" })
  .onError(({ error }) => {
    console.error({ "STUPID FUCKING ERROR": error });
  })
  .use(router);

export const ALL: APIRoute = ({ request }) => app.handle(request);
