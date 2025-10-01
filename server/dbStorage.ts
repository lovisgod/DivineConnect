import { db } from "./db";
import * as schema from "../shared/schema";
import { eq } from "drizzle-orm";
import { IStorage } from "./storage";

 class DBStorage implements IStorage {
    // Users
    async getUser(id: string): Promise<schema.User | undefined> {
        const users = await db.select().from(schema.users).where(eq(schema.users.id, id));
        return users[0];
    }

    // Sermons
    async getAllSermons(): Promise<schema.Sermon[]> {
        return db.select().from(schema.sermons);
    }

    async getRecentSermons(limit: number): Promise<schema.Sermon[]> {
        return db.select().from(schema.sermons).orderBy(schema.sermons.date).limit(limit);
    }

    // Devotions
    async getAllDevotions(): Promise<schema.Devotion[]> {
        return db.select().from(schema.devotions);
    }

    async getDevotionsByCategory(category: string): Promise<schema.Devotion[]> {
        return db.select().from(schema.devotions).where(eq(schema.devotions.category, category));
    }

    async getTodaysDevotions(): Promise<schema.Devotion[]> {
        const today = new Date();
        return db.select().from(schema.devotions).where(eq(schema.devotions.date, today));
    }

    // Contact Messages
    async getAllContactMessages(): Promise<schema.ContactMessage[]> {
        return db.select().from(schema.contactMessages);
    }

    // Leaders
    async getAllLeaders(): Promise<schema.Leader[]> {
        return db.select().from(schema.leaders);
    }

    // Existing methods
    async getUserByUsername(username: string): Promise<any | null> {
        const users = await db.select().from(schema.users).where(eq(schema.users.username, username));
        return users[0] ?? null;
    }

    async createUser(data: schema.InsertUser): Promise<schema.User> {
        const result = await db.insert(schema.users).values(data).returning();
        return result[0];
    }

    async getSermons(): Promise<schema.Sermon[]> {
        return db.select().from(schema.sermons);
    }

    async getSermonById(id: string): Promise<any | null> {
        const sermons = await db.select().from(schema.sermons).where(eq(schema.sermons.id, id));
        return sermons[0] ?? null;
    }

    async createSermon(data: schema.InsertSermon): Promise<schema.Sermon> {
        const result = await db.insert(schema.sermons).values(data).returning();
        return result[0];
    }

    async getDevotions(): Promise<schema.Devotion[]> {
        return db.select().from(schema.devotions);
    }

    async getDevotionById(id: string): Promise<any | null> {
        const devotions = await db.select().from(schema.devotions).where(eq(schema.devotions.id, id));
        return devotions[0] ?? null;
    }

    async createDevotion(data: schema.InsertDevotion): Promise<schema.Devotion> {
        const result = await db.insert(schema.devotions).values(data).returning();
        return result[0];
    }

    async getContactMessages(): Promise<schema.ContactMessage[]> {
        return db.select().from(schema.contactMessages);
    }

    async createContactMessage(data: schema.InsertContactMessage): Promise<schema.ContactMessage> {
        const result = await db.insert(schema.contactMessages).values(data).returning();
        return result[0];
    }

    async getLeaders(): Promise<schema.Leader[]> {
        return db.select().from(schema.leaders);
    }

    async getLeaderById(id: string): Promise<schema.Leader | null> {
        const leaders = await db.select().from(schema.leaders).where(eq(schema.leaders.id, id));
        return leaders[0] ?? null;
    }

    async createLeader(data: schema.InsertLeader): Promise<schema.Leader> {
        const result = await db.insert(schema.leaders).values(data).returning();
        return result[0];
    }
}

export const dbStorage = new DBStorage();