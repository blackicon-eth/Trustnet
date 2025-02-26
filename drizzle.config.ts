import dotenv from "dotenv";
import type { Config } from "drizzle-kit";
import { env } from "./lib/env";

dotenv.config({
  path: ".env",
});

export default {
  schema: "./lib/db/schemas/db.schema.ts",
  out: "./lib/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: env.TURSO_DATABASE_URL!,
    authToken: env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;
