import { users, yachts, type User, type InsertUser, type Yacht, type InsertYacht } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getYachts(): Promise<Yacht[]>;
  getYacht(id: number): Promise<Yacht | undefined>;
  createYacht(yacht: InsertYacht): Promise<Yacht>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private yachts: Map<number, Yacht>;
  private currentUserId: number;
  private currentYachtId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.yachts = new Map();
    this.currentUserId = 1;
    this.currentYachtId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, loyaltyPoints: 0 };
    this.users.set(id, user);
    return user;
  }

  async getYachts(): Promise<Yacht[]> {
    return Array.from(this.yachts.values());
  }

  async getYacht(id: number): Promise<Yacht | undefined> {
    return this.yachts.get(id);
  }

  async createYacht(insertYacht: InsertYacht): Promise<Yacht> {
    const id = this.currentYachtId++;
    const yacht: Yacht = { ...insertYacht, id };
    this.yachts.set(id, yacht);
    return yacht;
  }
}

export const storage = new MemStorage();
