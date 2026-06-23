import dotenv from "dotenv";
import path from "path";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

// To reference the global env file
dotenv.config({
  path: path.resolve(import.meta.dirname, "../../../.env"),
});

const datebaseUrl = process.env.DATABASE_URL;

if (!datebaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({ connectionString: datebaseUrl });

export const db = new PrismaClient({ adapter });
