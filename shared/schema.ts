import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  company: text("company"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scans = pgTable("scans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  targetUrl: text("target_url").notNull(),
  scanType: text("scan_type").notNull(), // "quick" or "deep"
  status: text("status").notNull(), // "pending", "in_progress", "completed", "failed"
  startTime: timestamp("start_time").defaultNow(),
  endTime: timestamp("end_time"),
  results: json("results"),
});

export const vulnerabilities = pgTable("vulnerabilities", {
  id: serial("id").primaryKey(),
  scanId: integer("scan_id").references(() => scans.id),
  type: text("type").notNull(),
  severity: text("severity").notNull(), // "critical", "high", "medium", "low", "info"
  description: text("description").notNull(),
  location: text("location").notNull(),
  details: json("details"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  company: true,
});

export const insertScanSchema = createInsertSchema(scans).pick({
  userId: true,
  targetUrl: true,
  scanType: true,
  status: true,
});

export const insertVulnerabilitySchema = createInsertSchema(vulnerabilities).pick({
  scanId: true,
  type: true,
  severity: true,
  description: true,
  location: true,
  details: true,
});

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const scanRequestSchema = z.object({
  targetUrl: z.string().url("Must be a valid URL"),
  scanType: z.enum(["quick", "deep"]),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertScan = z.infer<typeof insertScanSchema>;
export type Scan = typeof scans.$inferSelect;
export type InsertVulnerability = z.infer<typeof insertVulnerabilitySchema>;
export type Vulnerability = typeof vulnerabilities.$inferSelect;
export type LoginData = z.infer<typeof loginSchema>;
export type ScanRequest = z.infer<typeof scanRequestSchema>;
