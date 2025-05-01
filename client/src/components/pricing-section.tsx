import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckIcon, XIcon } from "lucide-react";

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

const PricingSection = () => {
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
      buttonText: "Get Started",
      buttonLink: "/auth?tab=register",
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
      buttonLink: "/auth?tab=register"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that best fits your security testing needs
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
            <Link href="/auth?tab=register">
              <Button className="whitespace-nowrap bg-secondary text-primary px-6 py-3 hover:bg-secondary/90">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
