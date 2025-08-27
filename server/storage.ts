import { 
  type User, type InsertUser, 
  type Sermon, type InsertSermon,
  type Devotion, type InsertDevotion,
  type ContactMessage, type InsertContactMessage,
  type Leader, type InsertLeader
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Sermons
  getAllSermons(): Promise<Sermon[]>;
  getSermonById(id: string): Promise<Sermon | undefined>;
  getRecentSermons(limit: number): Promise<Sermon[]>;
  createSermon(sermon: InsertSermon): Promise<Sermon>;

  // Devotions
  getAllDevotions(): Promise<Devotion[]>;
  getDevotionById(id: string): Promise<Devotion | undefined>;
  getDevotionsByCategory(category: string): Promise<Devotion[]>;
  getTodaysDevotions(): Promise<Devotion[]>;
  createDevotion(devotion: InsertDevotion): Promise<Devotion>;

  // Contact Messages
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;

  // Leaders
  getAllLeaders(): Promise<Leader[]>;
  createLeader(leader: InsertLeader): Promise<Leader>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private sermons: Map<string, Sermon>;
  private devotions: Map<string, Devotion>;
  private contactMessages: Map<string, ContactMessage>;
  private leaders: Map<string, Leader>;

  constructor() {
    this.users = new Map();
    this.sermons = new Map();
    this.devotions = new Map();
    this.contactMessages = new Map();
    this.leaders = new Map();

    // Seed some initial data
    this.seedData();
  }

  private seedData() {
    // Seed leaders
    const leadersData = [
      {
        name: "Pastor Michael Johnson",
        position: "Senior Pastor",
        description: "Leading our church with wisdom and compassion for over 15 years.",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        order: 1
      },
      {
        name: "Pastor Sarah Chen",
        position: "Associate Pastor", 
        description: "Passionate about youth ministry and community outreach programs.",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        order: 2
      },
      {
        name: "David Martinez",
        position: "Worship Leader",
        description: "Creates inspiring worship experiences that draw hearts closer to God.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
        order: 3
      }
    ];

    leadersData.forEach(leader => {
      const id = randomUUID();
      const newLeader: Leader = { ...leader, id };
      this.leaders.set(id, newLeader);
    });

    // Seed sermons
    const sermonsData = [
      {
        title: "Walking in Faith",
        speaker: "Pastor Michael Johnson",
        description: "In this powerful message, Pastor Michael explores what it means to walk by faith and not by sight. Drawing from biblical examples, we learn how to trust God's plan even when we can't see the full picture.",
        audioUrl: "https://example.com/audio/walking-in-faith.mp3",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        duration: 1935, // 32:15 in seconds
        date: new Date("2023-12-10")
      },
      {
        title: "Finding Hope in Difficult Times",
        speaker: "Pastor Sarah Chen",
        description: "When life gets tough, where do we turn? Pastor Sarah shares encouraging words about finding hope and strength through God's promises during our darkest moments.",
        audioUrl: "https://example.com/audio/finding-hope.mp3",
        imageUrl: "https://images.unsplash.com/photo-1544198365-f5d60b6d8190?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        duration: 1680, // 28 minutes
        date: new Date("2023-12-03")
      },
      {
        title: "The Power of Prayer",
        speaker: "Pastor David Martinez",
        description: "Discover the incredible power of prayer and how it can transform our lives and circumstances. Learn practical ways to deepen your prayer life and see God work.",
        audioUrl: "https://example.com/audio/power-of-prayer.mp3",
        imageUrl: "https://images.unsplash.com/photo-1507692049790-de58290a4334?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        duration: 2100, // 35 minutes
        date: new Date("2023-11-26")
      }
    ];

    sermonsData.forEach(sermon => {
      const id = randomUUID();
      const newSermon: Sermon = { ...sermon, id, createdAt: new Date() };
      this.sermons.set(id, newSermon);
    });

    // Seed devotions
    const devotionsData = [
      {
        title: "God's Unfailing Love",
        content: "In a world that often feels uncertain and challenging, we can find comfort in knowing that God's love for us never fails. This beautiful verse reminds us that our Heavenly Father not only loves us but delights in us. Take a moment today to reflect on this incredible truth and let it fill your heart with peace and joy.",
        verse: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
        reference: "Zephaniah 3:17",
        category: "morning",
        date: new Date("2023-12-10"),
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        title: "Rest in His Peace",
        content: "At the end of a long day, we can find true rest in God's perfect peace. This devotion reminds us to surrender our worries and anxieties to the One who cares for us deeply.",
        verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
        reference: "Matthew 11:28",
        category: "evening",
        date: new Date("2023-12-09"),
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    devotionsData.forEach(devotion => {
      const id = randomUUID();
      const newDevotion: Devotion = { ...devotion, id, createdAt: new Date() };
      this.devotions.set(id, newDevotion);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Sermon methods
  async getAllSermons(): Promise<Sermon[]> {
    return Array.from(this.sermons.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getSermonById(id: string): Promise<Sermon | undefined> {
    return this.sermons.get(id);
  }

  async getRecentSermons(limit: number): Promise<Sermon[]> {
    const allSermons = await this.getAllSermons();
    return allSermons.slice(0, limit);
  }

  async createSermon(insertSermon: InsertSermon): Promise<Sermon> {
    const id = randomUUID();
    const sermon: Sermon = { ...insertSermon, id, createdAt: new Date() };
    this.sermons.set(id, sermon);
    return sermon;
  }

  // Devotion methods
  async getAllDevotions(): Promise<Devotion[]> {
    return Array.from(this.devotions.values()).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getDevotionById(id: string): Promise<Devotion | undefined> {
    return this.devotions.get(id);
  }

  async getDevotionsByCategory(category: string): Promise<Devotion[]> {
    return Array.from(this.devotions.values())
      .filter(devotion => devotion.category === category)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  async getTodaysDevotions(): Promise<Devotion[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return Array.from(this.devotions.values())
      .filter(devotion => {
        const devotionDate = new Date(devotion.date);
        devotionDate.setHours(0, 0, 0, 0);
        return devotionDate.getTime() === today.getTime();
      });
  }

  async createDevotion(insertDevotion: InsertDevotion): Promise<Devotion> {
    const id = randomUUID();
    const devotion: Devotion = { ...insertDevotion, id, createdAt: new Date() };
    this.devotions.set(id, devotion);
    return devotion;
  }

  // Contact Message methods
  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id, createdAt: new Date() };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // Leader methods
  async getAllLeaders(): Promise<Leader[]> {
    return Array.from(this.leaders.values()).sort((a, b) => 
      (a.order || 0) - (b.order || 0)
    );
  }

  async createLeader(insertLeader: InsertLeader): Promise<Leader> {
    const id = randomUUID();
    const leader: Leader = { ...insertLeader, id };
    this.leaders.set(id, leader);
    return leader;
  }
}

export const storage = new MemStorage();
