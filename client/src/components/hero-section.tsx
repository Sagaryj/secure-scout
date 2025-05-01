import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, AlertTriangle, Search } from "lucide-react";
import ThreeScene from "./three-scene";

const HeroSection = () => {
  
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
              <Link href="/scan/basic">
                <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 glow-effect">
                  Scan Now
                </Button>
              </Link>
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
          <div className="lg:w-1/2 relative w-full min-h-[400px]" id="security-visual">
            <div className="relative z-10 h-full flex items-center justify-center">
              <div className="bg-primary/40 backdrop-blur-md p-8 rounded-xl border border-secondary/20 max-w-lg">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-background/20 p-5 rounded-lg flex flex-col items-center text-center">
                    <Shield className="h-10 w-10 text-secondary mb-3" />
                    <h3 className="font-semibold mb-1">Vulnerability Detection</h3>
                    <p className="text-sm text-muted-foreground">Identify security weaknesses before hackers do</p>
                  </div>
                  
                  <div className="bg-background/20 p-5 rounded-lg flex flex-col items-center text-center">
                    <AlertTriangle className="h-10 w-10 text-accent mb-3" />
                    <h3 className="font-semibold mb-1">Risk Assessment</h3>
                    <p className="text-sm text-muted-foreground">Prioritize threats based on severity</p>
                  </div>
                  
                  <div className="bg-background/20 p-5 rounded-lg flex flex-col items-center text-center">
                    <Search className="h-10 w-10 text-secondary mb-3" />
                    <h3 className="font-semibold mb-1">Advanced Scanning</h3>
                    <p className="text-sm text-muted-foreground">Deep analysis of web applications</p>
                  </div>
                  
                  <div className="bg-background/20 p-5 rounded-lg flex flex-col items-center text-center">
                    <CheckCircle className="h-10 w-10 text-secondary mb-3" />
                    <h3 className="font-semibold mb-1">Remediation</h3>
                    <p className="text-sm text-muted-foreground">Clear guidance to fix security issues</p>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Link href="/scan/basic">
                    <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 glow-effect">
                      Try It Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            
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
