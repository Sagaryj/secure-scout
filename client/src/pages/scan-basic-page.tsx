import { useState } from "react";
import { Helmet } from "react-helmet";
import Scanner from "@/components/scanner-input";
import ScanResults from "@/components/scan-results";
import { Shield, ShieldCheck } from "lucide-react";

export default function ScanBasicPage() {
  const [activeScanId, setActiveScanId] = useState<number | null>(null);

  function handleScanComplete(scanId: number) {
    setActiveScanId(scanId);
  }

  return (
    <>
      <Helmet>
        <title>Basic Security Scan | SecureScout</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-block p-3 rounded-full bg-secondary/10 mb-4">
              <ShieldCheck className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Basic Website Security Scan</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get a quick overview of your website's security posture with our basic scan tool.
              Limited to 3 scans!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 mt-10">
            {activeScanId ? (
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
              <Scanner forceScanType="basic" onScanComplete={handleScanComplete} />
            )}
          </div>

          <div className="mt-16 bg-primary/30 border border-secondary/20 rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">About our Basic Security Scan</h3>
                <p className="text-muted-foreground mb-4">
                  Our basic scan performs essential security checks on your website to identify common vulnerabilities.
                  For a more comprehensive assessment, consider our <a href="/scan/deep" className="text-secondary hover:underline">Deep Scan</a> or 
                  upgrade to a <a href="/pricing" className="text-secondary hover:underline">premium subscription</a>.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Basic vulnerability detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Quick results (5-10 minutes)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>No registration required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Simple vulnerability scoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Basic SSL certificate check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Common web vulnerability detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-secondary">✓</span>
                    <span>Limited to 3 scans</span>
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