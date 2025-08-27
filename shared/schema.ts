import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const sermons = pgTable("sermons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  speaker: text("speaker").notNull(),
  description: text("description"),
  audioUrl: text("audio_url").notNull(),
  imageUrl: text("image_url"),
  duration: integer("duration"), // in seconds
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const devotions = pgTable("devotions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  verse: text("verse").notNull(),
  reference: text("reference").notNull(),
  category: text("category").notNull(), // morning, evening, bible-study, youth
  date: timestamp("date").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").default(sql`now()`).notNull(),
});

export const leaders = pgTable("leaders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  position: text("position").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  order: integer("order").default(0),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export const insertSermonSchema = createInsertSchema(sermons).omit({
  id: true,
  createdAt: true,
});

export const insertDevotionSchema = createInsertSchema(devotions).omit({
  id: true,
  createdAt: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({
  id: true,
  createdAt: true,
});

export const insertLeaderSchema = createInsertSchema(leaders).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Sermon = typeof sermons.$inferSelect;
export type InsertSermon = z.infer<typeof insertSermonSchema>;

export type Devotion = typeof devotions.$inferSelect;
export type InsertDevotion = z.infer<typeof insertDevotionSchema>;

export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

export type Leader = typeof leaders.$inferSelect;
export type InsertLeader = z.infer<typeof insertLeaderSchema>;
