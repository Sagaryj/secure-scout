import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, Gauge, Shield, Clock, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import Scanner from "@/components/scanner-input";
import ScanResults from "@/components/scan-results";
import { formatDate, getScanStatusColor } from "@/lib/scan-utils";
import { Helmet } from "react-helmet";

const DashboardPage = () => {
  const { user } = useAuth();
  const [activeScanId, setActiveScanId] = useState<number | null>(null);
  
  const {
    data: scans,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["/api/scans"],
    enabled: !!user,
  });
  
  // Refetch scans when a new scan is started
  const handleScanComplete = (scanId: number) => {
    setActiveScanId(scanId);
    refetch();
  };
  
  // Stats for the dashboard
  const stats = {
    totalScans: scans?.length || 0,
    completedScans: scans?.filter(scan => scan.status === "completed").length || 0,
    pendingScans: scans?.filter(scan => scan.status === "pending" || scan.status === "in_progress").length || 0,
    failedScans: scans?.filter(scan => scan.status === "failed").length || 0,
  };
  
  // Chart data for vulnerability severity distribution
  const vulnerabilityStats = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0
  };
  
  // Calculate vulnerability stats if scans are loaded
  if (scans && scans.length > 0) {
    scans.forEach(scan => {
      if (scan.results && scan.results.summary && scan.results.summary.vulnerabilitiesBySeverity) {
        vulnerabilityStats.critical += scan.results.summary.vulnerabilitiesBySeverity.critical || 0;
        vulnerabilityStats.high += scan.results.summary.vulnerabilitiesBySeverity.high || 0;
        vulnerabilityStats.medium += scan.results.summary.vulnerabilitiesBySeverity.medium || 0;
        vulnerabilityStats.low += scan.results.summary.vulnerabilitiesBySeverity.low || 0;
        vulnerabilityStats.info += scan.results.summary.vulnerabilitiesBySeverity.info || 0;
      }
    });
  }
  
  return (
    <>
      <Helmet>
        <title>Dashboard | SecureScout</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your security scans and manage vulnerability findings
            </p>
          </div>
          <Button
            onClick={() => setActiveScanId(null)}
            className="bg-secondary text-primary hover:bg-secondary/90"
          >
            Start New Scan
          </Button>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {activeScanId ? (
              <ScanResults scanId={activeScanId} />
            ) : (
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle>Vulnerability Scanner</CardTitle>
                  <CardDescription>
                    Scan your web applications, APIs, and network for security vulnerabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Scanner onScanComplete={handleScanComplete} />
                </CardContent>
              </Card>
            )}
          </div>
          
          <div className="space-y-6">
            {/* Stats Cards */}
            <Card className="border-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Scan Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    <BarChart className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Scans</p>
                    <p className="text-lg font-semibold">{stats.totalScans}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="text-lg font-semibold">{stats.completedScans}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="text-lg font-semibold">{stats.pendingScans}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Failed</p>
                    <p className="text-lg font-semibold">{stats.failedScans}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Vulnerability Distribution */}
            <Card className="border-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Vulnerability Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Critical</span>
                    <span className="text-xs font-medium">{vulnerabilityStats.critical}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${vulnerabilityStats.critical > 0 ? Math.min(100, (vulnerabilityStats.critical / (vulnerabilityStats.critical + vulnerabilityStats.high + vulnerabilityStats.medium + vulnerabilityStats.low + vulnerabilityStats.info) * 100)) : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs">High</span>
                    <span className="text-xs font-medium">{vulnerabilityStats.high}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${vulnerabilityStats.high > 0 ? Math.min(100, (vulnerabilityStats.high / (vulnerabilityStats.critical + vulnerabilityStats.high + vulnerabilityStats.medium + vulnerabilityStats.low + vulnerabilityStats.info) * 100)) : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Medium</span>
                    <span className="text-xs font-medium">{vulnerabilityStats.medium}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${vulnerabilityStats.medium > 0 ? Math.min(100, (vulnerabilityStats.medium / (vulnerabilityStats.critical + vulnerabilityStats.high + vulnerabilityStats.medium + vulnerabilityStats.low + vulnerabilityStats.info) * 100)) : 0}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Low</span>
                    <span className="text-xs font-medium">{vulnerabilityStats.low}</span>
                  </div>
                  <div className="w-full bg-background rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${vulnerabilityStats.low > 0 ? Math.min(100, (vulnerabilityStats.low / (vulnerabilityStats.critical + vulnerabilityStats.high + vulnerabilityStats.medium + vulnerabilityStats.low + vulnerabilityStats.info) * 100)) : 0}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Security Score */}
            <Card className="border-secondary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Security Score</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                {scans && scans.length > 0 ? (
                  <>
                    <div className="w-32 h-32 relative mb-4">
                      <Gauge className="w-full h-full text-secondary" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {Math.max(0, 100 - (vulnerabilityStats.critical * 20 + vulnerabilityStats.high * 10 + vulnerabilityStats.medium * 5))}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      {vulnerabilityStats.critical > 0 
                        ? "Critical issues require immediate attention" 
                        : vulnerabilityStats.high > 0 
                        ? "High severity issues need to be addressed soon" 
                        : "Your security posture is looking good"}
                    </p>
                  </>
                ) : (
                  <div className="flex flex-col items-center py-6">
                    <Shield className="w-12 h-12 text-muted-foreground/50 mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      Complete a scan to view your security score
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Recent Scans */}
        <Card className="border-secondary/20 mb-8">
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
            <CardDescription>History of your vulnerability scans</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
                <p>Error loading scan history. Please try again.</p>
              </div>
            ) : scans && scans.length > 0 ? (
              <div className="rounded-md border border-secondary/20">
                <div className="grid grid-cols-12 gap-4 p-4 bg-primary/50 text-sm font-medium">
                  <div className="col-span-4">Target</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <Separator className="bg-secondary/20" />
                {scans.slice().reverse().map((scan, index) => (
                  <div key={scan.id}>
                    <div className="grid grid-cols-12 gap-4 p-4 text-sm items-center">
                      <div className="col-span-4 truncate">{scan.targetUrl}</div>
                      <div className="col-span-2 capitalize">{scan.scanType}</div>
                      <div className="col-span-2">
                        <Badge 
                          variant="outline" 
                          className={`${getScanStatusColor(scan.status)} border-current`}
                        >
                          {scan.status}
                        </Badge>
                      </div>
                      <div className="col-span-2 text-muted-foreground">
                        {formatDate(scan.startTime)}
                      </div>
                      <div className="col-span-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-secondary/30 hover:border-secondary"
                          onClick={() => setActiveScanId(scan.id)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                    {index < scans.length - 1 && <Separator className="bg-secondary/10" />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Shield className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No scan history yet</h3>
                <p className="text-muted-foreground">
                  Run your first security scan to start monitoring your attack surface
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardPage;
