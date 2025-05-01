import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { scanRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Vulnerability Scanning API
  app.post("/api/scan", async (req, res, next) => {
    try {
      // Validate scan request
      const validatedData = scanRequestSchema.parse(req.body);
      const { targetUrl, scanType } = validatedData;

      // Create a new scan record
      const userId = req.isAuthenticated() ? req.user!.id : null;
      
      const scan = await storage.createScan({
        userId,
        targetUrl,
        scanType,
        status: "pending"
      });

      // Start the scan asynchronously
      setTimeout(async () => {
        try {
          // Update scan status to in_progress
          await storage.updateScan(scan.id, { status: "in_progress" });
          
          // Mock scan process
          const scanDuration = scanType === "quick" ? 3000 : 8000;
          
          setTimeout(async () => {
            try {
              // Generate mock scan results
              const mockResults = generateMockScanResults(targetUrl, scanType);
              
              // Update scan with results
              await storage.updateScan(scan.id, { 
                status: "completed", 
                endTime: new Date(),
                results: mockResults
              });

              // Create vulnerability records if authenticated
              if (userId) {
                for (const vuln of mockResults.vulnerabilities) {
                  await storage.createVulnerability({
                    scanId: scan.id,
                    type: vuln.type,
                    severity: vuln.severity,
                    description: vuln.description,
                    location: vuln.location,
                    details: vuln.details
                  });
                }
              }
            } catch (error) {
              await storage.updateScan(scan.id, { 
                status: "failed", 
                endTime: new Date() 
              });
              console.error("Error completing scan:", error);
            }
          }, scanDuration);
          
        } catch (error) {
          await storage.updateScan(scan.id, { status: "failed" });
          console.error("Error processing scan:", error);
        }
      }, 500);

      // Return the scan ID immediately
      res.status(201).json({ 
        id: scan.id, 
        status: scan.status 
      });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid scan request",
          errors: error.errors
        });
      }
      next(error);
    }
  });

  // Get scan status and results
  app.get("/api/scan/:id", async (req, res, next) => {
    try {
      const scanId = parseInt(req.params.id);
      
      if (isNaN(scanId)) {
        return res.status(400).json({ message: "Invalid scan ID" });
      }
      
      const scan = await storage.getScan(scanId);
      
      if (!scan) {
        return res.status(404).json({ message: "Scan not found" });
      }
      
      // If authenticated and this is user's scan, include vulnerabilities
      if (req.isAuthenticated() && scan.userId === req.user!.id) {
        const vulnerabilities = await storage.getVulnerabilitiesByScanId(scanId);
        return res.json({
          ...scan,
          vulnerabilities
        });
      }
      
      // For unauthenticated or other users, return basic scan info
      res.json(scan);
      
    } catch (error) {
      next(error);
    }
  });

  // Get all scans for authenticated user
  app.get("/api/scans", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const scans = await storage.getScansByUserId(req.user!.id);
    res.json(scans);
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to generate mock scan results
function generateMockScanResults(targetUrl: string, scanType: string) {
  const vulnerabilityTypes = [
    { type: "XSS", severity: "high", description: "Cross-site scripting vulnerability" },
    { type: "SQLi", severity: "critical", description: "SQL injection vulnerability" },
    { type: "CSRF", severity: "medium", description: "Cross-site request forgery" },
    { type: "Information Disclosure", severity: "low", description: "Information leakage" },
    { type: "Outdated Software", severity: "medium", description: "Outdated software version" },
    { type: "Insecure Cookies", severity: "low", description: "Cookies without secure flag" },
    { type: "Insecure Headers", severity: "low", description: "Missing security headers" },
    { type: "Open Ports", severity: "medium", description: "Unnecessary open ports" }
  ];
  
  // For quick scan, find 1-3 vulnerabilities, for deep scan find 3-8
  const vulnCount = scanType === "quick" 
    ? Math.floor(Math.random() * 3) + 1 
    : Math.floor(Math.random() * 6) + 3;
  
  // Randomly select vulnerabilities
  const selectedVulns = [];
  const usedIndexes = new Set();
  
  for (let i = 0; i < vulnCount; i++) {
    let idx;
    do {
      idx = Math.floor(Math.random() * vulnerabilityTypes.length);
    } while (usedIndexes.has(idx));
    
    usedIndexes.add(idx);
    const vuln = vulnerabilityTypes[idx];
    
    selectedVulns.push({
      ...vuln,
      location: `${targetUrl}/${['admin', 'api', 'user', 'search', 'login'][Math.floor(Math.random() * 5)]}`,
      details: {
        discoveredAt: new Date().toISOString(),
        explanation: `This is a detailed explanation of the ${vuln.type} vulnerability found.`,
        recommendation: `We recommend fixing this ${vuln.type} vulnerability by following security best practices.`
      }
    });
  }
  
  return {
    summary: {
      targetUrl,
      scanType,
      completedAt: new Date().toISOString(),
      vulnerabilitiesBySeverity: {
        critical: selectedVulns.filter(v => v.severity === "critical").length,
        high: selectedVulns.filter(v => v.severity === "high").length,
        medium: selectedVulns.filter(v => v.severity === "medium").length,
        low: selectedVulns.filter(v => v.severity === "low").length,
        info: selectedVulns.filter(v => v.severity === "info").length,
      },
      totalVulnerabilities: selectedVulns.length
    },
    vulnerabilities: selectedVulns
  };
}
