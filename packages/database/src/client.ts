import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const datebaseUrl = process.env.DATABASE_URL;

if (!datebaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString: datebaseUrl });

export const db = new PrismaClient({ adapter });
