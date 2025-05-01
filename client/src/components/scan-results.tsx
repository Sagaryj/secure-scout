import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, AlertCircle, AlertTriangle, Info, XCircle } from "lucide-react";
import { getScanStatus, getSeverityColor, getScanStatusColor, formatDate } from "@/lib/scan-utils";

type ScanResultsProps = {
  scanId: number;
  className?: string;
};

const ScanResults = ({ scanId, className = "" }: ScanResultsProps) => {
  const [scan, setScan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [polling, setPolling] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchScanStatus = async () => {
      try {
        const data = await getScanStatus(scanId);
        setScan(data);
        
        // If scan is completed or failed, stop polling
        if (data.status === "completed" || data.status === "failed") {
          if (polling) {
            clearInterval(polling);
            setPolling(null);
          }
        }
        
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch scan status");
        setLoading(false);
        if (polling) {
          clearInterval(polling);
          setPolling(null);
        }
      }
    };

    // Initial fetch
    fetchScanStatus();
    
    // Start polling if not already polling
    if (!polling) {
      const interval = setInterval(fetchScanStatus, 3000);
      setPolling(interval);
    }
    
    // Cleanup
    return () => {
      if (polling) {
        clearInterval(polling);
      }
    };
  }, [scanId, polling]);

  const getScanStatusContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-secondary mb-4" />
          <h3 className="text-lg font-medium">Loading scan results...</h3>
          <p className="text-muted-foreground mt-2">This may take a moment</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="text-lg font-medium">Error loading scan</h3>
          <p className="text-muted-foreground mt-2">{error}</p>
        </div>
      );
    }
    
    if (!scan) {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <Info className="h-10 w-10 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No scan data found</h3>
          <p className="text-muted-foreground mt-2">Scan may have been deleted or expired</p>
        </div>
      );
    }
    
    if (scan.status === "pending" || scan.status === "in_progress") {
      const progress = scan.status === "pending" ? 10 : 40;
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="w-full max-w-md mb-6">
            <Progress value={progress} className="h-2 bg-secondary/20" />
          </div>
          <Loader2 className="h-10 w-10 animate-spin text-secondary mb-4" />
          <h3 className="text-lg font-medium">
            {scan.status === "pending" ? "Preparing scan..." : "Scanning in progress..."}
          </h3>
          <p className="text-muted-foreground mt-2">
            {scan.status === "pending" 
              ? "We're getting ready to scan your target" 
              : `We're actively scanning ${scan.targetUrl}`}
          </p>
          <div className="mt-6 text-sm">
            <span className="text-secondary font-medium">Scan ID:</span> {scanId}
          </div>
          <div className="mt-2 text-sm">
            <span className="text-secondary font-medium">Target:</span> {scan.targetUrl}
          </div>
          <div className="mt-2 text-sm">
            <span className="text-secondary font-medium">Scan Type:</span> {scan.scanType}
          </div>
        </div>
      );
    }
    
    if (scan.status === "failed") {
      return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <XCircle className="h-10 w-10 text-destructive mb-4" />
          <h3 className="text-lg font-medium">Scan failed</h3>
          <p className="text-muted-foreground mt-2">We encountered an error while scanning {scan.targetUrl}</p>
          <div className="mt-6 text-sm">
            <span className="text-secondary font-medium">Scan ID:</span> {scanId}
          </div>
          <div className="mt-2 text-sm">
            <span className="text-secondary font-medium">Target:</span> {scan.targetUrl}
          </div>
        </div>
      );
    }
    
    // Scan completed successfully
    if (scan.status === "completed" && scan.results) {
      const { summary, vulnerabilities } = scan.results;
      
      return (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-medium">Scan Results</h3>
              <p className="text-muted-foreground text-sm">
                Completed {scan.endTime ? formatDate(scan.endTime) : 'recently'}
              </p>
            </div>
            <Badge 
              variant="outline" 
              className={`${getScanStatusColor(scan.status)} border-current px-3 py-1`}
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Completed
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-primary/50 border-secondary/20">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground text-sm mb-1">Target</p>
                <p className="font-medium truncate max-w-full">{scan.targetUrl}</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/50 border-secondary/20">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground text-sm mb-1">Scan Type</p>
                <p className="font-medium capitalize">{scan.scanType} Scan</p>
              </CardContent>
            </Card>
            <Card className="bg-primary/50 border-secondary/20">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <p className="text-muted-foreground text-sm mb-1">Found Issues</p>
                <p className="font-medium">{summary.totalVulnerabilities} vulnerabilities</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-6 border-secondary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vulnerabilities by Severity</CardTitle>
              <CardDescription>Overview of discovered security issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Badge className="bg-red-500/20 text-red-500 hover:bg-red-500/30 mb-2">
                    {summary.vulnerabilitiesBySeverity.critical || 0}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Critical</span>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 mb-2">
                    {summary.vulnerabilitiesBySeverity.high || 0}
                  </Badge>
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30 mb-2">
                    {summary.vulnerabilitiesBySeverity.medium || 0}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Medium</span>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 mb-2">
                    {summary.vulnerabilitiesBySeverity.low || 0}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Low</span>
                </div>
                <div className="flex flex-col items-center">
                  <Badge className="bg-gray-500/20 text-gray-500 hover:bg-gray-500/30 mb-2">
                    {summary.vulnerabilitiesBySeverity.info || 0}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Info</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <h4 className="text-lg font-medium mb-4">Detailed Findings</h4>
          
          {vulnerabilities && vulnerabilities.length > 0 ? (
            <div className="space-y-4">
              {vulnerabilities.map((vulnerability: any, index: number) => (
                <Card key={index} className="border-secondary/20">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-4 items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getSeverityColor(vulnerability.severity)}>
                            {vulnerability.severity.toUpperCase()}
                          </Badge>
                          <h5 className="font-medium">{vulnerability.type}</h5>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{vulnerability.description}</p>
                        <p className="text-xs text-muted-foreground mb-2">
                          <span className="font-medium text-secondary">Location:</span> {vulnerability.location}
                        </p>
                        {vulnerability.details && (
                          <div className="mt-3 pt-3 border-t border-secondary/10 text-xs">
                            <p className="font-medium text-secondary mb-1">Recommendation:</p>
                            <p className="text-muted-foreground">{vulnerability.details.recommendation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-secondary/20">
              <CardContent className="p-6 text-center">
                <Info className="h-8 w-8 text-secondary mx-auto mb-2" />
                <p>No vulnerabilities were detected in this scan.</p>
                <p className="text-muted-foreground text-sm mt-2">
                  This doesn't guarantee the target is secure. Consider a deeper scan or manual testing.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      );
    }
    
    // Fallback for unexpected state
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
        <h3 className="text-lg font-medium">Unexpected scan state</h3>
        <p className="text-muted-foreground mt-2">The scan is in an unknown state. Please try again.</p>
      </div>
    );
  };

  return (
    <Card className={`border-secondary/20 ${className}`}>
      {getScanStatusContent()}
    </Card>
  );
};

export default ScanResults;
