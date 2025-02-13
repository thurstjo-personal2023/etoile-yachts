import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  app.get("/api/yachts", async (_req, res) => {
    const yachts = await storage.getYachts();
    res.json(yachts);
  });

  app.get("/api/yachts/:id", async (req, res) => {
    const yacht = await storage.getYacht(Number(req.params.id));
    if (!yacht) return res.sendStatus(404);
    res.json(yacht);
  });

  const httpServer = createServer(app);
  return httpServer;
}
