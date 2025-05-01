import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { GlobeIcon, NetworkIcon, GitBranchIcon, KeyIcon, CloudIcon, FileCodeIcon, ArrowRight, Play } from "lucide-react";
import ThreeScene from "@/components/three-scene";

const ToolCard = ({
  icon: Icon,
  title,
  description
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <Link href="/">
    <Card className="bg-primary/70 rounded-xl p-6 border border-secondary/20 hover:border-secondary/40 transition-all hover:translate-y-[-4px] group">
      <div className="flex items-start space-x-4">
        <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="text-secondary text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-secondary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm">
            {description}
          </p>
        </div>
      </div>
    </Card>
  </Link>
);

const ToolsSection = () => {
  const tools = [
    {
      icon: GlobeIcon,
      title: "Website Vulnerability Scanner",
      description: "Accurately detect common vulnerabilities like XSS, SQLi, OS Command injection in classic and modern web applications."
    },
    {
      icon: NetworkIcon,
      title: "Network Vulnerability Scanner",
      description: "Find open ports, missing security patches, service misconfigurations, and critical CVEs in your infrastructure."
    },
    {
      icon: GitBranchIcon,
      title: "Subdomain Finder",
      description: "Discover subdomains of your target domain to map the full attack surface and find forgotten assets."
    },
    {
      icon: KeyIcon,
      title: "Password Auditor",
      description: "Find weak credentials and prove the risk of unauthorized access to your systems and applications."
    },
    {
      icon: CloudIcon,
      title: "Cloud Security Scanner",
      description: "Identify misconfigurations and security issues in your cloud infrastructure (AWS, Azure, GCP)."
    },
    {
      icon: FileCodeIcon,
      title: "API Vulnerability Scanner",
      description: "Test REST and GraphQL APIs for security issues, authorization flaws, and data exposure risks."
    }
  ];

  return (
    <section id="tools" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">SecureScout Platform Overview</h2>
          <p className="text-muted-foreground text-lg">
            Our platform combines 20+ tools and features to streamline the entire security testing workflow.
          </p>
        </div>
        
        {/* Platform Demo Preview */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-secondary/30 mb-16 mx-auto max-w-4xl">
          <div className="aspect-[16/9] bg-primary/50 flex items-center justify-center">
            <div className="absolute inset-0 opacity-20">
              <ThreeScene />
            </div>
            <div className="relative z-10 text-center p-8">
              <h3 className="text-2xl font-bold mb-6">See SecureScout in Action</h3>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                Watch how our platform helps you identify and remediate security vulnerabilities in your systems.
              </p>
              <Button className="bg-secondary text-primary px-6 py-6 rounded-full font-medium hover:bg-secondary/90 transition-colors flex items-center glow-effect">
                <Play className="mr-2 h-5 w-5" /> See how it works
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/">
            <Button className="bg-secondary text-primary px-6 py-3 hover:bg-secondary/90 glow-effect">
              View all tools <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
