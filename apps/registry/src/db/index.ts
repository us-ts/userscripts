import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import env from "~/env/index";

export * as schema from "./schema";

const client = neon(env.DATABASE_URL);
export default drizzle({ client });
