import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

type TestimonialProps = {
  quote: string;
  author: string;
  title: string;
  company?: string;
  rating: number;
  avatarSeed?: string;
};

const Testimonial = ({ quote, author, title, company, rating, avatarSeed }: TestimonialProps) => {
  return (
    <Card className="bg-primary/50 border-secondary/20 backdrop-blur-sm transition-all duration-300 hover:border-secondary/40 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex space-x-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? "text-secondary fill-secondary" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <blockquote className="text-foreground font-medium mb-6">
          "{quote}"
        </blockquote>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3 border border-secondary/30">
            <AvatarFallback className="bg-secondary/10 text-secondary">
              {author.split(' ').map(name => name[0]).join('')}
            </AvatarFallback>
            {avatarSeed && (
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${avatarSeed}`} />
            )}
          </Avatar>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">{title}{company && `, ${company}`}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "SecureScout's deep scan identified critical vulnerabilities in our application that we had missed. The detailed reports and remediation advice were instrumental in improving our security posture.",
      author: "Samantha Chen",
      title: "CISO",
      company: "TechNova Systems",
      rating: 5,
      avatarSeed: "samantha-chen"
    },
    {
      quote: "The scanning tool is incredibly easy to use, yet comprehensive. It has become an essential part of our regular security assessment process. Highly recommended!",
      author: "Michael Rodriguez",
      title: "Security Engineer",
      company: "DataSphere Inc",
      rating: 5,
      avatarSeed: "michael-rodriguez"
    },
    {
      quote: "We've been using SecureScout for over a year now. The continuous improvements and cutting-edge vulnerability detection have been invaluable for our security team.",
      author: "Priya Sharma",
      title: "Head of IT Security",
      company: "GlobalFinance",
      rating: 4,
      avatarSeed: "priya-sharma"
    },
    {
      quote: "As a small business, we didn't have the resources for a full security team. SecureScout's solution fills that gap perfectly - affordable, thorough, and user-friendly.",
      author: "David Wilson",
      title: "CTO",
      company: "Startup Innovations",
      rating: 5,
      avatarSeed: "david-wilson"
    }
  ];

  return (
    <section className="py-16 bg-primary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what security professionals are saying about SecureScout.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-3">Trusted by security teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            <div className="text-lg font-semibold text-secondary/70">Vodafone</div>
            <div className="text-lg font-semibold text-secondary/70">IBM Security</div>
            <div className="text-lg font-semibold text-secondary/70">Accenture</div>
            <div className="text-lg font-semibold text-secondary/70">Microsoft</div>
            <div className="text-lg font-semibold text-secondary/70">Cisco</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;