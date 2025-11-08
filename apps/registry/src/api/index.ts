import { Elysia } from "elysia";

import orgs from "./orgs";
import userscripts from "./userscripts";

export default new Elysia({ prefix: "/api" }).use(orgs).use(userscripts);
