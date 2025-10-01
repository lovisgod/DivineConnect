import type { Express } from "express";
import { createServer, type Server } from "http";
import { dbStorage } from "./dbStorage";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Sermons routes
  app.get("/api/sermons", async (req, res) => {
    try {
      const sermons = await dbStorage.getSermons();
      console.log(sermons); 
      res.json(sermons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sermons" });
    }
  });

  app.get("/api/sermons/recent", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 3;
      const sermons = await dbStorage.getRecentSermons(limit);
      console.log(sermons); 
      res.json(sermons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent sermons" });
    }
  });

  app.get("/api/sermons/:id", async (req, res) => {
    try {
      const sermon = await storage.getSermonById(req.params.id);
      if (!sermon) {
        return res.status(404).json({ message: "Sermon not found" });
      }
      res.json(sermon);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sermon" });
    }
  });

  // Devotions routes
  app.get("/api/devotions", async (req, res) => {
    try {
      const { category } = req.query;
      if (category && typeof category === "string") {
        const devotions = await storage.getDevotionsByCategory(category);
        res.json(devotions);
      } else {
        const devotions = await storage.getAllDevotions();
        res.json(devotions);
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch devotions" });
    }
  });

  app.get("/api/devotions/today", async (req, res) => {
    try {
      const devotions = await storage.getTodaysDevotions();
      res.json(devotions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch today's devotions" });
    }
  });

  app.get("/api/devotions/:id", async (req, res) => {
    try {
      const devotion = await storage.getDevotionById(req.params.id);
      if (!devotion) {
        return res.status(404).json({ message: "Devotion not found" });
      }
      res.json(devotion);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch devotion" });
    }
  });

  // Leaders routes
  app.get("/api/leaders", async (req, res) => {
    try {
      const leaders = await storage.getAllLeaders();
      res.json(leaders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leaders" });
    }
  });

  // Contact messages routes
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.status(201).json({ message: "Message sent successfully", data: message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to send message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
