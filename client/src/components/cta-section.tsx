import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary/80 relative overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to secure your digital assets?</h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
            Start with a free vulnerability scan today and discover how SecureScout can help protect your organization from cyber threats.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#scanner">
              <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 glow-effect w-full sm:w-auto">
                Start Free Scan
              </Button>
            </a>
            <Link href="/auth?tab=register">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-secondary/40 hover:border-secondary bg-primary/50 backdrop-blur-sm hover:bg-primary/70 w-full sm:w-auto"
              >
                Schedule a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
