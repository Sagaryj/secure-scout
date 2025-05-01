import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, MapIcon, SearchIcon, BugIcon, FileTextIcon, LineChartIcon, ShieldIcon } from "lucide-react";
import { Link } from "wouter";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  features,
  link,
  linkText
}: {
  icon: React.ElementType;
  title: string;
  features: string[];
  link: string;
  linkText: string;
}) => (
  <Card className="bg-background rounded-xl overflow-hidden border border-secondary/20 hover:border-secondary/40 transition-colors shadow-lg hover:shadow-secondary/20">
    <CardContent className="p-6">
      <div className="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        <Icon className="text-secondary text-xl" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <ul className="space-y-3 mt-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3 text-sm text-muted-foreground">
            <CheckIcon className="text-secondary mt-1 h-4 w-4" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href={link} className="text-secondary text-sm font-medium hover:text-secondary/80 transition-colors inline-flex items-center">
          {linkText}
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </CardContent>
  </Card>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: MapIcon,
      title: "Attack Surface Mapping",
      features: [
        "Discover subdomains, open ports, and running services",
        "Map web application technologies and take screenshots",
        "Detect WAFs and discover hidden files by fuzzing"
      ],
      link: "/",
      linkText: "Explore mapping tools",
    },
    {
      icon: SearchIcon,
      title: "Vulnerability Scanning",
      features: [
        "Detect XSS, SQLi, OS Command injection in web applications",
        "Identify specific issues with specialized scanners",
        "Find missing patches, misconfigurations, and critical CVEs"
      ],
      link: "/",
      linkText: "Explore vulnerability scanners",
    },
    {
      icon: BugIcon,
      title: "Exploitation",
      features: [
        "Exploit critical CVEs and gain initial access",
        "Extract sensitive files and demonstrate real impact",
        "Create strong proof-of-concepts for your customers"
      ],
      link: "/",
      linkText: "Discover exploit tools",
    },
    {
      icon: FileTextIcon,
      title: "Pentest Reporting",
      features: [
        "Create editable reports from your findings 50% faster",
        "Use predefined templates with common finding patterns",
        "Create custom, reusable findings and report templates"
      ],
      link: "/",
      linkText: "Learn about reporting",
    },
    {
      icon: LineChartIcon,
      title: "Security Monitoring",
      features: [
        "Schedule periodic vulnerability scans",
        "Automatically send reports to Email, Slack or Webhooks",
        "Get notifications when high risk issues are found"
      ],
      link: "/",
      linkText: "Discover monitoring",
    },
    {
      icon: ShieldIcon,
      title: "Custom Security Testing",
      features: [
        "Customized penetration testing services",
        "Expert-led security assessments",
        "Tailored security recommendations"
      ],
      link: "/experts",
      linkText: "Contact our experts",
    }
  ];

  return (
    <section id="features" className="py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            What you can do with <span className="text-secondary">SecureScout</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Built by a team of experienced penetration testers, SecureScout is a web-based platform that speeds-up the common steps performed in almost every security assessment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
