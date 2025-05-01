import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { CheckIcon, XIcon } from "lucide-react";
import { Helmet } from "react-helmet";
import CTASection from "@/components/cta-section";

type PricingPlanProps = {
  title: string;
  price: string;
  description: string;
  features: { included: boolean; text: string }[];
  buttonText: string;
  buttonLink: string;
  highlighted?: boolean;
  popular?: boolean;
};

const PricingPlan = ({
  title,
  price,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
  popular = false,
}: PricingPlanProps) => (
  <div className={`
    ${highlighted 
      ? "bg-background rounded-xl overflow-hidden border-2 border-secondary relative transform scale-105 shadow-lg shadow-secondary/20" 
      : "bg-background rounded-xl overflow-hidden border border-secondary/20 hover:shadow-lg hover:shadow-secondary/10 transition-all"}
  `}>
    {popular && (
      <div className="absolute top-0 right-0 bg-secondary text-primary px-4 py-1 text-xs font-bold">
        POPULAR
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-muted-foreground">/month</span>
      </div>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-3 text-sm">
            {feature.included ? (
              <CheckIcon className="text-secondary mt-1 h-4 w-4" />
            ) : (
              <XIcon className="text-muted-foreground mt-1 h-4 w-4" />
            )}
            <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
          </li>
        ))}
      </ul>
      <Link href={buttonLink}>
        <Button 
          className={`w-full ${highlighted 
            ? "bg-secondary text-primary hover:bg-secondary/90 glow-effect" 
            : buttonText === "Get Started" 
              ? "bg-secondary/20 text-secondary hover:bg-secondary/30" 
              : "border border-secondary text-secondary hover:bg-secondary hover:text-primary"
          }`}
          variant={highlighted ? "default" : "outline"}
        >
          {buttonText}
        </Button>
      </Link>
    </div>
  </div>
);

const PricingFeaturesList = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <div className="p-6 bg-primary/50 rounded-xl border border-secondary/20">
      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
        <div className="text-secondary text-2xl">🔍</div>
      </div>
      <h3 className="text-lg font-medium mb-2">Vulnerability Scanning</h3>
      <p className="text-muted-foreground text-sm">
        Regular scans to identify security issues in your web applications, networks, and cloud infrastructure.
      </p>
    </div>
    
    <div className="p-6 bg-primary/50 rounded-xl border border-secondary/20">
      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
        <div className="text-secondary text-2xl">📊</div>
      </div>
      <h3 className="text-lg font-medium mb-2">Detailed Reporting</h3>
      <p className="text-muted-foreground text-sm">
        Comprehensive reports with actionable recommendations and prioritized remediation steps.
      </p>
    </div>
    
    <div className="p-6 bg-primary/50 rounded-xl border border-secondary/20">
      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
        <div className="text-secondary text-2xl">🔄</div>
      </div>
      <h3 className="text-lg font-medium mb-2">Continuous Monitoring</h3>
      <p className="text-muted-foreground text-sm">
        Schedule automated scans and receive alerts when new vulnerabilities are discovered.
      </p>
    </div>
    
    <div className="p-6 bg-primary/50 rounded-xl border border-secondary/20">
      <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
        <div className="text-secondary text-2xl">👩‍💻</div>
      </div>
      <h3 className="text-lg font-medium mb-2">Expert Support</h3>
      <p className="text-muted-foreground text-sm">
        Access to security professionals for guidance and remediation assistance.
      </p>
    </div>
  </div>
);

const ComparisonTable = () => (
  <div className="overflow-hidden rounded-xl border border-secondary/20 mb-16">
    <div className="grid grid-cols-4 text-sm">
      <div className="bg-primary p-4 font-medium">Features</div>
      <div className="bg-primary p-4 font-medium text-center">Free</div>
      <div className="bg-primary p-4 font-medium text-center">Professional</div>
      <div className="bg-primary p-4 font-medium text-center">Enterprise</div>

      <div className="border-t border-secondary/10 p-4">Basic vulnerability scanning</div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>

      <div className="border-t border-secondary/10 p-4">Advanced vulnerability detection</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>

      <div className="border-t border-secondary/10 p-4">Monthly scans</div>
      <div className="border-t border-secondary/10 p-4 text-center">5</div>
      <div className="border-t border-secondary/10 p-4 text-center">Unlimited</div>
      <div className="border-t border-secondary/10 p-4 text-center">Unlimited</div>

      <div className="border-t border-secondary/10 p-4">Report formats</div>
      <div className="border-t border-secondary/10 p-4 text-center">PDF</div>
      <div className="border-t border-secondary/10 p-4 text-center">PDF, DOCX, CSV</div>
      <div className="border-t border-secondary/10 p-4 text-center">PDF, DOCX, CSV, Custom</div>

      <div className="border-t border-secondary/10 p-4">API access</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>

      <div className="border-t border-secondary/10 p-4">Team management</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center">Up to 5 users</div>
      <div className="border-t border-secondary/10 p-4 text-center">Unlimited</div>

      <div className="border-t border-secondary/10 p-4">Custom vulnerability checks</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>

      <div className="border-t border-secondary/10 p-4">Email notifications</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>

      <div className="border-t border-secondary/10 p-4">Slack/Webhook integration</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>

      <div className="border-t border-secondary/10 p-4">Priority support</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center">Email</div>
      <div className="border-t border-secondary/10 p-4 text-center">Email + Phone</div>

      <div className="border-t border-secondary/10 p-4">Custom reporting</div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><XIcon className="inline h-4 w-4 text-muted-foreground" /></div>
      <div className="border-t border-secondary/10 p-4 text-center"><CheckIcon className="inline h-4 w-4 text-secondary" /></div>
    </div>
  </div>
);

const PricingPage = () => {
  const plans = [
    {
      title: "Free Plan",
      price: "$0",
      description: "Perfect for getting started with basic security testing",
      features: [
        { included: true, text: "Basic vulnerability scanning" },
        { included: true, text: "5 scans per month" },
        { included: true, text: "PDF report generation" },
        { included: false, text: "No advanced scanning tools" },
        { included: false, text: "No API access" }
      ],
      buttonText: "Get Started",
      buttonLink: "/auth?tab=register"
    },
    {
      title: "Professional",
      price: "$99",
      description: "Ideal for security professionals and small teams",
      features: [
        { included: true, text: "Full vulnerability scanning suite" },
        { included: true, text: "Unlimited scans" },
        { included: true, text: "Advanced reporting (PDF, DOCX, CSV)" },
        { included: true, text: "API access" },
        { included: true, text: "Email notifications" }
      ],
      buttonText: "Subscribe Now",
      buttonLink: "/payment?plan=professional",
      highlighted: true,
      popular: true
    },
    {
      title: "Enterprise",
      price: "$499",
      description: "For large teams and organizations with advanced needs",
      features: [
        { included: true, text: "Everything in Professional" },
        { included: true, text: "Team management" },
        { included: true, text: "SAML/SSO Integration" },
        { included: true, text: "Custom vulnerability checks" },
        { included: true, text: "Priority support" }
      ],
      buttonText: "Contact Sales",
      buttonLink: "/payment?plan=enterprise"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing | SecureScout</title>
        <meta name="description" content="Choose the right security testing plan for your needs - from free basic scanning to enterprise-level security solutions." />
      </Helmet>
      
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground text-lg">
              Choose the plan that best fits your security testing needs, from basic scanning to enterprise security solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <PricingPlan key={index} {...plan} />
            ))}
          </div>
          
          <div className="mt-16 bg-background/20 rounded-xl p-8 max-w-5xl mx-auto border border-secondary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Need a custom solution?</h3>
                <p className="text-muted-foreground">
                  Contact our sales team for a tailored enterprise solution to meet your specific security testing requirements.
                </p>
              </div>
              <Link href="/contact">
                <Button className="whitespace-nowrap bg-secondary text-primary px-6 py-3 hover:bg-secondary/90">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What's Included</h2>
            <p className="text-muted-foreground">
              All plans come with powerful security testing tools to help protect your digital assets
            </p>
          </div>
          
          <PricingFeaturesList />
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Features Comparison</h2>
            <p className="text-muted-foreground">
              Compare plans to find the right fit for your organization
            </p>
          </div>
          
          <ComparisonTable />
          
          <div className="rounded-xl bg-primary p-8 border border-secondary/20 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3 flex justify-center">
                <div className="h-32 w-32 rounded-full bg-secondary/10 flex items-center justify-center">
                  <div className="text-5xl">🔒</div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Enterprise Security Program</h3>
                <p className="text-muted-foreground mb-4">
                  For organizations that need comprehensive security testing, custom solutions, and dedicated support, our Enterprise program offers a tailored approach to securing your digital assets.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckIcon className="text-secondary mr-2 mt-1 h-4 w-4" />
                    <span>Custom security testing plans based on your infrastructure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="text-secondary mr-2 mt-1 h-4 w-4" />
                    <span>Dedicated security engineer assigned to your account</span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="text-secondary mr-2 mt-1 h-4 w-4" />
                    <span>Quarterly security reviews and roadmap planning</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-primary">
                    Contact Enterprise Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CTASection />
    </>
  );
};

export default PricingPage;
