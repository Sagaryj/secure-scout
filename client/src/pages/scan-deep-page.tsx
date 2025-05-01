import { useState } from "react";
import { Helmet } from "react-helmet";
import Scanner from "@/components/scanner-input";
import ScanResults from "@/components/scan-results";
import { useAuth } from "@/hooks/use-auth";
import { AlertTriangle, Lock, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ScanDeepPage() {
  const [activeScanId, setActiveScanId] = useState<number | null>(null);
  const { user } = useAuth();

  function handleScanComplete(scanId: number) {
    setActiveScanId(scanId);
  }

  return (
    <>
      <Helmet>
        <title>Deep Security Scan | SecureScout</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-3 rounded-full bg-accent/10 mb-4">
              <ShieldAlert className="h-10 w-10 text-accent" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Deep Security Scan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive deep scan detects advanced vulnerabilities and security issues with detailed reporting.
            </p>
            {!user && (
              <div className="mt-4 inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">Requires subscription</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8 mt-10">
            {!user ? (
              <Card className="relative border-secondary/20 bg-primary/50 backdrop-blur-md overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20" />
                </div>
                <CardContent className="p-8 relative">
                  <div className="flex flex-col items-center text-center">
                    <Lock className="h-16 w-16 text-secondary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Premium Feature</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Deep scanning is available to subscribed users only. Sign up or log in to access this feature.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <Link href="/auth">
                        <Button className="bg-secondary text-primary hover:bg-secondary/90">
                          Log In
                        </Button>
                      </Link>
                      <Link href="/auth?tab=register">
                        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                          Sign Up
                        </Button>
                      </Link>
                      <Link href="/pricing">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                          View Pricing
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : activeScanId ? (
              <div className="animate-fadeIn">
                <ScanResults scanId={activeScanId} />
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setActiveScanId(null)}
                    className="text-secondary underline hover:text-secondary/80"
                  >
                    Start a new scan
                  </button>
                </div>
              </div>
            ) : (
              <Scanner forceScanType="deep" onScanComplete={handleScanComplete} />
            )}
          </div>

          <div className="mt-16 bg-primary/30 border border-secondary/20 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <ShieldAlert className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">About Deep Security Scans</h3>
                <p className="text-muted-foreground mb-4">
                  Our deep scan performs comprehensive security checks on your website to identify both common and advanced vulnerabilities.
                  Results include detailed explanations and remediation advice.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Advanced vulnerability detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Thorough analysis (30-60 minutes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Detailed remediation recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent">✓</span>
                    <span>Comprehensive security reporting</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}