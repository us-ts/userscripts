import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import type { Env } from "~/env";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: env<Env>("DATABASE_URL"),
  },
});
