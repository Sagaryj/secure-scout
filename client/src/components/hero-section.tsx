import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Scanner from "./scanner-input";
import ScanResults from "./scan-results";
import ThreeScene from "./three-scene";

const HeroSection = () => {
  const [activeScanId, setActiveScanId] = useState<number | null>(null);
  
  const handleScanComplete = (scanId: number) => {
    setActiveScanId(scanId);
  };
  
  return (
    <section className="matrix-bg py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 pb-8">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Get a <span className="text-secondary glow-text">hacker's perspective</span><br />
              on your web apps, network,<br />
              and cloud
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              SecureScout helps security teams run the key steps of a penetration test, easily and without expert hacking skills.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <CheckCircle className="text-secondary mt-1 h-5 w-5" />
                <span>Automatically map the attack surface</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="text-secondary mt-1 h-5 w-5" />
                <span>Scan for the latest critical vulnerabilities</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="text-secondary mt-1 h-5 w-5" />
                <span>Comprehensive vulnerability assessment</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="text-secondary mt-1 h-5 w-5" />
                <span>Write pentest reports 50% faster</span>
              </li>
            </ul>
            <div className="pt-4 flex flex-wrap gap-4">
              <a href="#scanner" className="hidden lg:inline-flex">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 glow-effect">
                  Scan now for free
                </Button>
              </a>
              <Link href="/auth">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-secondary/40 hover:border-secondary bg-primary/50 backdrop-blur-sm hover:bg-primary/70"
                >
                  Book a live demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative w-full min-h-[400px]" id="scanner">
            {activeScanId ? (
              <ScanResults 
                scanId={activeScanId} 
                className="relative z-10"
              />
            ) : (
              <Scanner 
                onScanComplete={handleScanComplete} 
                className="relative z-10"
              />
            )}
            
            {/* 3D backdrop */}
            <div className="absolute -top-12 -right-8 h-16 w-16 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-secondary/20 rounded-full blur-xl"></div>
            
            {/* Replace with ThreeJS 3D Scene in larger screens */}
            <div className="absolute inset-0 -z-10 opacity-40 hidden lg:block">
              <ThreeScene />
            </div>
          </div>
        </div>
        
        {/* Trust bar */}
        <div className="mt-16 border-t border-secondary/20 pt-8">
          <p className="text-center text-sm text-muted-foreground mb-6">Trusted by 1,500+ security teams in 119+ countries</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
            <div className="h-8 flex items-center">
              <span className="text-lg font-bold text-secondary/80">Vodafone</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-lg font-bold text-secondary/80">Accenture</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-lg font-bold text-secondary/80">Microsoft</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-lg font-bold text-secondary/80">IBM</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-lg font-bold text-secondary/80">Cisco</span>
            </div>
            <div className="h-8 flex items-center">
              <span className="text-lg font-bold text-secondary/80">Amazon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
