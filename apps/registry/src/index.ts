import { Elysia } from "elysia";

import api from "./api";

export default new Elysia().use(api);
