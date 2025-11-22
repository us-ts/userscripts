import { Elysia } from "elysia";

import auth from "~/auth";
import api from "~/api";

export default new Elysia()
  .onError(({ error }) => {
    console.error(error);
  })
  .use(auth)
  .use(api);
