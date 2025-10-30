import { Elysia } from "elysia";

import auth from "./auth";
import api from "./api";

export default new Elysia().use(auth).use(api);
