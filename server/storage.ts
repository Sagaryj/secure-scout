import { users, scans, vulnerabilities, User, InsertUser, Scan, InsertScan, Vulnerability, InsertVulnerability } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Scan operations
  createScan(scan: InsertScan): Promise<Scan>;
  getScansByUserId(userId: number): Promise<Scan[]>;
  getScan(id: number): Promise<Scan | undefined>;
  updateScan(id: number, scan: Partial<Scan>): Promise<Scan | undefined>;
  
  // Vulnerability operations
  createVulnerability(vulnerability: InsertVulnerability): Promise<Vulnerability>;
  getVulnerabilitiesByScanId(scanId: number): Promise<Vulnerability[]>;
  
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scans: Map<number, Scan>;
  private vulnerabilities: Map<number, Vulnerability>;
  sessionStore: session.SessionStore;
  currentUserId: number;
  currentScanId: number;
  currentVulnerabilityId: number;

  constructor() {
    this.users = new Map();
    this.scans = new Map();
    this.vulnerabilities = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // Prune expired entries every 24h
    });
    this.currentUserId = 1;
    this.currentScanId = 1;
    this.currentVulnerabilityId = 1;
  }

  // User operations
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
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Scan operations
  async createScan(insertScan: InsertScan): Promise<Scan> {
    const id = this.currentScanId++;
    const startTime = new Date();
    const scan: Scan = { ...insertScan, id, startTime, results: null };
    this.scans.set(id, scan);
    return scan;
  }

  async getScansByUserId(userId: number): Promise<Scan[]> {
    return Array.from(this.scans.values()).filter(
      (scan) => scan.userId === userId
    );
  }

  async getScan(id: number): Promise<Scan | undefined> {
    return this.scans.get(id);
  }

  async updateScan(id: number, scanUpdate: Partial<Scan>): Promise<Scan | undefined> {
    const existingScan = this.scans.get(id);
    if (!existingScan) return undefined;
    
    const updatedScan = { ...existingScan, ...scanUpdate };
    this.scans.set(id, updatedScan);
    return updatedScan;
  }

  // Vulnerability operations
  async createVulnerability(insertVulnerability: InsertVulnerability): Promise<Vulnerability> {
    const id = this.currentVulnerabilityId++;
    const vulnerability: Vulnerability = { ...insertVulnerability, id };
    this.vulnerabilities.set(id, vulnerability);
    return vulnerability;
  }

  async getVulnerabilitiesByScanId(scanId: number): Promise<Vulnerability[]> {
    return Array.from(this.vulnerabilities.values()).filter(
      (vulnerability) => vulnerability.scanId === scanId
    );
  }
}

export const storage = new MemStorage();
