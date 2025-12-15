import { Elysia } from "elysia";

import auth from "~/auth/index";
import api from "~/router/index";

export default new Elysia({ prefix: "/api" })
  .onError(({ error }) => {
    console.error(error);
  })
  .use(auth)
  .use(api);
