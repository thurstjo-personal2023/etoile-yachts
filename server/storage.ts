import { users, yachts, type User, type InsertUser, type Yacht } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getYachts(): Promise<Yacht[]>;
  getYacht(id: number): Promise<Yacht | undefined>;
  createYacht(yacht: InsertUser): Promise<Yacht>;
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getYachts(): Promise<Yacht[]> {
    return await db.select().from(yachts);
  }

  async getYacht(id: number): Promise<Yacht | undefined> {
    const [yacht] = await db.select().from(yachts).where(eq(yachts.id, id));
    return yacht;
  }

  async createYacht(insertYacht: any): Promise<Yacht> {
    const [yacht] = await db.insert(yachts).values(insertYacht).returning();
    return yacht;
  }
}

export const storage = new DatabaseStorage();