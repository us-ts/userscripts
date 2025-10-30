import { Elysia } from "elysia";

export default new Elysia({ prefix: "/userscripts" }).get("/", () => ({
  path: "usescripts",
}));
