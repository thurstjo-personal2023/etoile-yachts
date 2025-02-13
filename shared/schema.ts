import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role", { enum: ["consumer", "producer", "partner"] }).notNull(),
  name: text("name").notNull(),
  loyaltyPoints: integer("loyalty_points").notNull().default(0),
});

export const yachts = pgTable("yachts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  capacity: integer("capacity").notNull(),
  pricePerDay: integer("price_per_day").notNull(),
  features: text("features").array().notNull(),
  images: text("images").array().notNull(),
  producerId: integer("producer_id").notNull(),
  available: boolean("available").notNull().default(true),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  name: true,
});

export const insertYachtSchema = createInsertSchema(yachts);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Yacht = typeof yachts.$inferSelect;
