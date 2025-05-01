import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "wouter";
import { LinkedinIcon, TwitterIcon, Globe, CheckIcon, Star, Calendar, Phone, Mail, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

type ExpertCardProps = {
  name: string;
  title: string;
  bio: string;
  certifications: string[];
  experience: string;
  specialties: string[];
  imageUrl?: string;
  imageColor?: string;
};

const ExpertCard = ({ 
  name, 
  title, 
  bio, 
  certifications, 
  experience, 
  specialties,
  imageUrl,
  imageColor
}: ExpertCardProps) => (
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
        <div className={`w-full h-64 ${imageColor}`}></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent"></div>
    </div>
    <div className="p-6 relative -mt-12">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-secondary text-sm mb-3">{title}</p>
      <p className="text-muted-foreground text-sm mb-4">
        {bio}
      </p>
      
      <div className="mt-4 pt-4 border-t border-secondary/10">
        <p className="text-xs font-medium mb-2">CERTIFICATIONS</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {certifications.map((cert, idx) => (
            <span key={idx} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
              {cert}
            </span>
          ))}
        </div>
        
        <p className="text-xs font-medium mb-2">SPECIALTIES</p>
        <div className="space-y-1 mb-4">
          {specialties.map((specialty, idx) => (
            <div key={idx} className="flex items-start text-xs text-muted-foreground">
              <CheckIcon className="text-secondary mr-1 mt-0.5 h-3 w-3" />
              <span>{specialty}</span>
            </div>
          ))}
        </div>
        
        <p className="text-xs font-medium mb-1">EXPERIENCE</p>
        <p className="text-xs text-muted-foreground mb-4">{experience}</p>
      </div>
      
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

const ServiceCard = ({ 
  title, 
  description, 
  features, 
  price, 
  icon 
}: { 
  title: string; 
  description: string; 
  features: string[]; 
  price: string;
  icon: string;
}) => (
  <Card className="bg-background rounded-xl border border-secondary/20 hover:border-secondary/40 transition-all">
    <CardContent className="p-6">
      <div className="mb-4 h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center">
        <div className="text-2xl">{icon}</div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div className="space-y-2 mb-6">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start">
            <CheckIcon className="text-secondary mr-2 mt-1 h-4 w-4" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t border-secondary/10 pt-4 mb-6">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{price}</span>
          <span className="ml-1 text-muted-foreground text-sm">starting at</span>
        </div>
      </div>
      
      <Link href="/auth?tab=register">
        <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
          Request Service
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const ExpertsPage = () => {
  const { toast } = useToast();
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  
  const experts = [
    {
      name: "Alex Morgan",
      title: "Chief Security Officer",
      bio: "15+ years of experience in penetration testing and security assessments for Fortune 500 companies.",
      certifications: ["CISSP", "OSCP", "CEH"],
      experience: "Led security assessments for financial, healthcare, and government sectors.",
      specialties: [
        "Cloud security architecture",
        "Advanced penetration testing",
        "Security program development"
      ],
      imageUrl: "/images/experts/expert1.jpg"
    },
    {
      name: "Sarah Chen",
      title: "Lead Web Application Pentester",
      bio: "Specialized in advanced web application security and secure coding practices.",
      certifications: ["OSWE", "OWASP", "SANS GWAPT"],
      experience: "Discovered critical vulnerabilities in major e-commerce and banking applications.",
      specialties: [
        "API security testing",
        "Modern web framework security",
        "Secure SDLC implementation"
      ],
      imageUrl: "/images/experts/expert2.png"
    },
    {
      name: "David Wilson",
      title: "Network Security Specialist",
      bio: "Expert in network infrastructure security and cloud environment protection.",
      certifications: ["CCNP Security", "AWS Security", "Azure Security"],
      experience: "Designed secure network architectures for enterprise and cloud environments.",
      specialties: [
        "Network defense strategies",
        "Cloud infrastructure security",
        "Zero trust architecture"
      ],
      imageUrl: "/images/experts/expert3.png"
    },
    {
      name: "Maya Patel",
      title: "Exploit Development Lead",
      bio: "Specialized in zero-day research and exploit development for various platforms.",
      certifications: ["OSEE", "SLAE", "eCPPT"],
      experience: "Contributed to multiple CVEs and developed custom exploits for red team engagements.",
      specialties: [
        "Binary exploitation",
        "Reverse engineering",
        "Red team operations"
      ],
      imageUrl: "/images/experts/expert4.png"
    }
  ];
  
  const services = [
    {
      title: "Web Application Penetration Testing",
      description: "Comprehensive security assessment of your web applications to identify and exploit vulnerabilities.",
      features: [
        "In-depth testing of OWASP Top 10 vulnerabilities",
        "Authentication and session management testing",
        "Business logic flaw identification",
        "Detailed reporting with remediation guidance"
      ],
      price: "$3,500",
      icon: "🔍"
    },
    {
      title: "Network Security Assessment",
      description: "Thorough examination of your internal and external network infrastructure for security weaknesses.",
      features: [
        "Network architecture review",
        "Vulnerability scanning and exploitation",
        "Firewall and network device configuration review",
        "Security control effectiveness testing"
      ],
      price: "$4,200",
      icon: "🌐"
    },
    {
      title: "Cloud Security Review",
      description: "Evaluate the security of your cloud infrastructure and identify risks in your deployment.",
      features: [
        "AWS/Azure/GCP security configuration review",
        "Identity and access management assessment",
        "Security architecture validation",
        "Compliance alignment checking"
      ],
      price: "$5,000",
      icon: "☁️"
    },
    {
      title: "Red Team Operation",
      description: "Simulate real-world targeted attacks to test your organization's detection and response capabilities.",
      features: [
        "Custom attack scenarios based on threat models",
        "Multi-vector attack simulation",
        "Social engineering campaigns",
        "Advanced persistent threat simulation"
      ],
      price: "$8,500",
      icon: "🔥"
    },
    {
      title: "Mobile Application Security Assessment",
      description: "Comprehensive security testing of your iOS and Android applications.",
      features: [
        "Static and dynamic analysis",
        "API security testing",
        "Secure storage validation",
        "Authentication and authorization testing"
      ],
      price: "$3,800",
      icon: "📱"
    },
    {
      title: "Security Program Development",
      description: "Build or enhance your organization's security program with expert guidance.",
      features: [
        "Security policy and procedure development",
        "Security control implementation",
        "Security awareness training",
        "Regulatory compliance alignment"
      ],
      price: "$10,000",
      icon: "🛡️"
    }
  ];
  
  // Form definition
  const contactFormSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    company: z.string().optional(),
    service: z.string().min(1, {
      message: "Please select a service type.",
    }),
    message: z.string().min(10, {
      message: "Message must be at least 10 characters.",
    }),
  });

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: ""
    },
  });

  function onSubmit(values: z.infer<typeof contactFormSchema>) {
    // In a real implementation, this would send the data to the server
    console.log(values);
    toast({
      title: "Message sent!",
      description: "A security expert will contact you shortly.",
    });
    setMessageSubmitted(true);
    form.reset();
  }

  return (
    <>
      <Helmet>
        <title>Security Experts | SecureScout</title>
        <meta name="description" content="Meet our team of professional security experts and learn about our advanced security testing services." />
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-primary py-20 relative overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Our Security Experts</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Our team of certified security professionals brings years of experience to help protect your digital assets from emerging threats.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#services">
                <Button className="bg-secondary text-primary hover:bg-secondary/90">
                  View Services
                </Button>
              </Link>
              <Link href="#contact">
                <Button variant="outline" className="border-secondary/40 hover:border-secondary">
                  Contact an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Experts Grid */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-muted-foreground">
              Our security experts have helped organizations of all sizes strengthen their security posture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.map((expert, index) => (
              <ExpertCard key={index} {...expert} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Clients Say</h2>
            <p className="text-muted-foreground">
              Don't just take our word for it - hear from organizations we've helped secure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="bg-background border-secondary/20">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  "The SecureScout team found critical vulnerabilities in our application that our previous security vendor missed. Their detailed reporting and remediation guidance made it easy for our developers to fix the issues quickly."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary/30 to-accent/30 mr-3"></div>
                  <div>
                    <p className="font-medium">Michael Roberts</p>
                    <p className="text-xs text-muted-foreground">CTO, FinTech Innovations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background border-secondary/20">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  "Working with Sarah and the web application security team was an excellent experience. They not only identified vulnerabilities but also provided training to our development team on secure coding practices."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/30 to-secondary/30 mr-3"></div>
                  <div>
                    <p className="font-medium">Jennifer Chen</p>
                    <p className="text-xs text-muted-foreground">Security Director, E-commerce Plus</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background border-secondary/20">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  "The cloud security assessment performed by David's team was invaluable. They identified misconfigurations in our AWS environment that could have led to a serious data breach. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-secondary/30 mr-3"></div>
                  <div>
                    <p className="font-medium">Robert Jackson</p>
                    <p className="text-xs text-muted-foreground">Cloud Architect, HealthTech Solutions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div id="services" className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Security Services</h2>
            <p className="text-muted-foreground">
              Comprehensive security testing and consulting services tailored to your organization's needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
          
          <div className="mt-16 bg-primary/50 rounded-xl p-8 border border-secondary/20 max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/3">
                <div className="h-32 w-32 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <div className="text-5xl">🔒</div>
                </div>
              </div>
              <div className="lg:w-2/3">
                <h3 className="text-2xl font-bold mb-4">Custom Security Solutions</h3>
                <p className="text-muted-foreground mb-4">
                  Don't see exactly what you need? Our security experts can create a custom assessment plan tailored to your unique requirements and technology stack.
                </p>
                <Link href="#contact">
                  <Button className="bg-secondary text-primary hover:bg-secondary/90">
                    Get a Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div id="contact" className="bg-primary py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Contact our security experts to discuss your security testing needs or to schedule a consultation.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email Us</h4>
                      <p className="text-muted-foreground text-sm">
                        experts@securescout.com<br />
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Call Us</h4>
                      <p className="text-muted-foreground text-sm">
                        +1 (555) 123-4567<br />
                        Monday-Friday, 9am-5pm EST
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Schedule a Consultation</h4>
                      <p className="text-muted-foreground text-sm mb-2">
                        Book a 30-minute call with one of our security experts
                      </p>
                      <Link href="/auth?tab=register">
                        <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-primary">
                          Book a Meeting
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <Card className="bg-background border-secondary/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Send us a Message</h3>
                    
                    {messageSubmitted ? (
                      <div className="text-center py-8">
                        <CheckIcon className="mx-auto h-12 w-12 text-secondary mb-4" />
                        <h4 className="text-lg font-medium mb-2">Thank you for reaching out!</h4>
                        <p className="text-muted-foreground mb-6">
                          We've received your message and a security expert will contact you shortly.
                        </p>
                        <Button 
                          onClick={() => setMessageSubmitted(false)}
                          className="bg-secondary text-primary hover:bg-secondary/90"
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John Smith" {...field} className="bg-primary/30 border-secondary/30" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="you@example.com" {...field} className="bg-primary/30 border-secondary/30" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Acme Inc." {...field} className="bg-primary/30 border-secondary/30" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="service"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Service Interested In</FormLabel>
                                <FormControl>
                                  <select 
                                    {...field} 
                                    className="flex h-10 w-full rounded-md border border-secondary/30 bg-primary/30 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  >
                                    <option value="">Select a service</option>
                                    {services.map((service, idx) => (
                                      <option key={idx} value={service.title}>{service.title}</option>
                                    ))}
                                    <option value="Custom">Custom Security Solution</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Please describe your security needs or questions" 
                                    className="min-h-[120px] bg-primary/30 border-secondary/30"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button 
                            type="submit" 
                            className="w-full bg-secondary text-primary hover:bg-secondary/90"
                          >
                            Send Message
                          </Button>
                        </form>
                      </Form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about our security testing services
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-4">
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">What qualifications do your security experts have?</h3>
                    <p className="text-muted-foreground text-sm">
                      Our security experts hold industry-recognized certifications such as CISSP, OSCP, CEH, and SANS certifications. They also have years of practical experience in penetration testing, vulnerability assessment, and security architecture.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">How do you ensure the confidentiality of our data?</h3>
                    <p className="text-muted-foreground text-sm">
                      We follow strict confidentiality protocols and all our engagements are covered by comprehensive NDAs. Our team uses secure communication channels and encrypted storage for all client data.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Do you provide emergency incident response services?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes, we offer emergency incident response services for existing clients. Our team can quickly respond to security incidents and provide guidance on containment, eradication, and recovery.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services" className="space-y-4">
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">What types of applications can you test?</h3>
                    <p className="text-muted-foreground text-sm">
                      We can test a wide range of applications including web applications, mobile apps (iOS and Android), APIs, desktop applications, and cloud-native applications.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Do you test internal networks or only external-facing systems?</h3>
                    <p className="text-muted-foreground text-sm">
                      We can test both internal networks and external-facing systems. For internal network testing, we coordinate with your team to establish secure access methods.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">What deliverables can we expect from a security assessment?</h3>
                    <p className="text-muted-foreground text-sm">
                      Our standard deliverables include a comprehensive report with an executive summary, detailed technical findings, severity ratings, proof-of-concept evidence, and actionable remediation recommendations.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="engagement" className="space-y-4">
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">How long does a typical security assessment take?</h3>
                    <p className="text-muted-foreground text-sm">
                      The duration depends on the scope and complexity of the assessment. A standard web application assessment typically takes 1-2 weeks, while more comprehensive assessments may take longer.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">What information do you need before starting an assessment?</h3>
                    <p className="text-muted-foreground text-sm">
                      We typically request information about the target systems, network diagrams, IP ranges, user credentials (if applicable), and points of contact for the engagement.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-secondary/20">
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">Do you provide post-assessment support?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes, we offer post-assessment support to help your team understand and address the findings. This can include remediation guidance, verification testing, and developer security training.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpertsPage;
