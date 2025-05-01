import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { LinkedinIcon, TwitterIcon, Globe } from "lucide-react";

type ExpertCardProps = {
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
};

const ExpertCard = ({ name, title, bio, imageUrl }: ExpertCardProps) => (
  <Card className="bg-primary/70 rounded-xl overflow-hidden border border-secondary/20 hover:border-secondary/40 transition-all">
    <div className="relative">
      {imageUrl ? (
        <div className="w-full h-64 bg-primary/80 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={`${name} - ${title}`} 
            className="w-full h-full object-cover object-center opacity-90"
          />
        </div>
      ) : (
        <div className="w-full h-64 bg-gradient-to-br from-secondary/20 to-accent/20"></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
    </div>
    <div className="p-6 relative -mt-12">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-secondary text-sm mb-3">{title}</p>
      <p className="text-muted-foreground text-sm mb-4">
        {bio}
      </p>
      <div className="flex space-x-3">
        <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
          <LinkedinIcon className="h-4 w-4" />
        </a>
        <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
          <TwitterIcon className="h-4 w-4" />
        </a>
        <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
          <Globe className="h-4 w-4" />
        </a>
      </div>
    </div>
  </Card>
);

const ExpertsSection = () => {
  const experts = [
    {
      name: "Alex Morgan",
      title: "Chief Security Officer",
      bio: "15+ years of experience in penetration testing and security assessments for Fortune 500 companies.",
      imageUrl: "/images/experts/expert1.jpg"
    },
    {
      name: "Sarah Chen",
      title: "Lead Web Application Pentester",
      bio: "Specialized in advanced web application security and secure coding practices.",
      imageUrl: "/images/experts/expert2.png"
    },
    {
      name: "David Wilson",
      title: "Network Security Specialist",
      bio: "Expert in network infrastructure security and cloud environment protection.",
      imageUrl: "/images/experts/expert3.png"
    },
    {
      name: "Maya Patel",
      title: "Exploit Development Lead",
      bio: "Specialized in zero-day research and exploit development for various platforms.",
      imageUrl: "/images/experts/expert4.png"
    }
  ];

  return (
    <section id="experts" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Security Experts</h2>
          <p className="text-muted-foreground text-lg">
            Our team of certified security professionals brings years of experience to help protect your digital assets.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <ExpertCard 
              key={index} 
              {...expert} 
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/auth?tab=register">
            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary hover:text-primary transition-colors"
            >
              Schedule a Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
