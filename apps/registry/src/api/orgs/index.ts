import { Elysia } from "elysia";

export default new Elysia({ prefix: "/orgs" }).get("/", () => ({
  path: "orgs",
}));
