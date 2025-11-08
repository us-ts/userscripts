import { PrismaClient } from "./generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import env from "~/env";

const adapter = new PrismaNeon({ connectionString: env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export { prisma };
