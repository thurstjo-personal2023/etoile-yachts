import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import path from "path";
import express from "express";

export function registerRoutes(app: Express): Server {
  setupAuth(app);
  
  // Serve static files from client/public directory at root path
  app.use('/yachts', express.static(path.join(process.cwd(), 'client/public/yachts')));
  app.use(express.static(path.join(process.cwd(), 'client/public')));

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
