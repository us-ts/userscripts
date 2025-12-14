import { Elysia } from "elysia";

import userscripts from "./userscripts";

export default new Elysia({ prefix: "/api" }).use(userscripts);
