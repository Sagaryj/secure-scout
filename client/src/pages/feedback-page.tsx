import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  StarHalf, 
  MessageSquare, 
  Star as StarEmpty, 
  User, 
  Building2, 
  ScanLine,
  Shield,
  ThumbsUp,
  Terminal,
  AlertTriangle
} from "lucide-react";
import { queryClient } from "@/lib/queryClient";

// Feedback form schema
const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message is too long"),
  category: z.enum(["general", "scan", "security", "usability", "features"]),
});

type FeedbackValues = z.infer<typeof feedbackSchema>;

// Static testimonials data to display in the page
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechSolutions Inc.",
    role: "CTO",
    rating: 5,
    title: "Exceptional vulnerability scanning",
    message: "The deep scan found security issues our previous solution missed. The detailed reports helped us prioritize fixes effectively. Customer support was responsive and knowledgeable.",
    date: "2025-02-15",
    category: "scan",
    avatarSeed: "sarah"
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "DataSecure",
    role: "Security Analyst",
    rating: 4.5,
    title: "Great tool for security teams",
    message: "We've integrated SecureScout into our weekly security checks. The API is well-documented and the scan results are comprehensive. Would love to see more customization options.",
    date: "2025-03-20",
    category: "security",
    avatarSeed: "michael"
  },
  {
    id: 3,
    name: "Rebecca Torres",
    company: "E-Commerce Platform",
    role: "DevOps Lead",
    rating: 5,
    title: "Essential for our CI/CD pipeline",
    message: "SecureScout has become an integral part of our deployment process. The automated scans have caught several critical vulnerabilities before they reached production.",
    date: "2025-04-05",
    category: "features",
    avatarSeed: "rebecca"
  },
  {
    id: 4,
    name: "David Wilson",
    company: "FinTech Solutions",
    role: "CISO",
    rating: 4,
    title: "Solid security platform",
    message: "We rely on SecureScout for regulatory compliance. The reports are detailed enough for auditors, and the interface is intuitive for our team. A few more compliance templates would be perfect.",
    date: "2025-03-10",
    category: "usability",
    avatarSeed: "david"
  }
];

// Categories with icons
const categories = [
  { value: "general", label: "General Feedback", icon: MessageSquare },
  { value: "scan", label: "Scanning Functions", icon: ScanLine },
  { value: "security", label: "Security Features", icon: Shield },
  { value: "usability", label: "Usability & Interface", icon: ThumbsUp },
  { value: "features", label: "Feature Requests", icon: Terminal }
];

// Star Rating Component
const StarRating = ({ rating, size = 20, onChange, interactive = false }: {
  rating: number;
  size?: number;
  onChange?: (rating: number) => void;
  interactive?: boolean;
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    const filled = interactive ? (hoverRating || rating) >= i : rating >= i;
    const half = !filled && rating + 0.5 >= i;
    
    stars.push(
      <span 
        key={i}
        className={`${interactive ? 'cursor-pointer' : ''}`}
        onClick={() => interactive && onChange && onChange(i)}
        onMouseEnter={() => interactive && setHoverRating(i)}
        onMouseLeave={() => interactive && setHoverRating(0)}
      >
        {filled ? (
          <Star className="text-yellow-400" size={size} fill="#facc15" />
        ) : half ? (
          <StarHalf className="text-yellow-400" size={size} fill="#facc15" />
        ) : (
          <StarEmpty className="text-gray-400" size={size} />
        )}
      </span>
    );
  }
  
  return <div className="flex">{stars}</div>;
};

// Testimonial Card Component
const TestimonialCard = ({ 
  name, 
  role,
  company, 
  rating, 
  title, 
  message, 
  date,
  category,
  avatarSeed = "avatar"
}: {
  name: string;
  role: string;
  company: string;
  rating: number;
  title: string;
  message: string;
  date: string;
  category: string;
  avatarSeed?: string;
}) => {
  // Get category icon
  const CategoryIcon = categories.find(c => c.value === category)?.icon || MessageSquare;
  
  return (
    <Card className="bg-primary/30 backdrop-blur-md border-secondary/20">
      <CardHeader className="pb-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-secondary/20 overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`} 
                alt={`${name} avatar`}
                className="h-full w-full"
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold">{name}</h4>
              <p className="text-xs text-muted-foreground">{role} at {company}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <CategoryIcon className="h-4 w-4 text-secondary" />
            <StarRating rating={rating} size={16} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <h3 className="font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <p className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
      </CardFooter>
    </Card>
  );
};

export default function FeedbackPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [selectedRating, setSelectedRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState("all");
  
  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      title: "",
      message: "",
      category: "general",
    }
  });
  
  // Filter testimonials based on selected category
  const filteredTestimonials = filter === "all" 
    ? testimonials 
    : testimonials.filter(t => t.category === filter);

  function onSubmit(values: FeedbackValues) {
    // Make sure the user is logged in
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit feedback",
        variant: "destructive",
      });
      
      navigate("/auth");
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Show success toast
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
      
      // Reset form
      form.reset();
      setSelectedRating(0);
      setSubmitting(false);
      
      // In a real app, we would send this feedback to an API
      console.log("Submitted feedback:", values);
    }, 1500);
  }
  
  return (
    <>
      <Helmet>
        <title>Customer Feedback | SecureScout</title>
      </Helmet>
      
      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Customer Feedback</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We value your thoughts on SecureScout. Share your experience or browse what others have to say about our services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-1">
            <Card className="bg-primary/30 backdrop-blur-md border-secondary/20 sticky top-24">
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>
                  {user 
                    ? "Tell us about your experience with SecureScout" 
                    : "Log in to submit your feedback"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {user ? (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <StarRating 
                                  rating={selectedRating} 
                                  onChange={(rating) => {
                                    setSelectedRating(rating);
                                    field.onChange(rating);
                                  }}
                                  interactive={true}
                                  size={24}
                                />
                                <span className="text-sm text-muted-foreground ml-2">
                                  {selectedRating > 0 ? `${selectedRating} out of 5` : "Select a rating"}
                                </span>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {categories.map((category) => {
                                  const Icon = category.icon;
                                  const isSelected = field.value === category.value;
                                  
                                  return (
                                    <Button
                                      key={category.value}
                                      type="button"
                                      variant={isSelected ? "default" : "outline"}
                                      className={`flex items-center justify-start space-x-2 h-auto py-2 px-3 ${
                                        isSelected 
                                          ? "bg-secondary text-primary" 
                                          : "border-secondary/20 hover:bg-secondary/10"
                                      }`}
                                      onClick={() => field.onChange(category.value)}
                                    >
                                      <Icon className="h-4 w-4" />
                                      <span className="text-sm">{category.label}</span>
                                    </Button>
                                  );
                                })}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Summarize your feedback" 
                                className="bg-background/50"
                                {...field} 
                              />
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
                                placeholder="Share your detailed feedback" 
                                className="min-h-32 bg-background/50" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Your feedback helps us improve our services.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-secondary text-primary hover:bg-secondary/90"
                        disabled={submitting}
                      >
                        {submitting ? (
                          <div className="flex items-center space-x-2">
                            <span className="animate-spin">⟳</span>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          "Submit Feedback"
                        )}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div className="space-y-6">
                    <AlertTriangle className="h-12 w-12 text-secondary mx-auto" />
                    <p className="text-center text-muted-foreground">
                      You need to be logged in to submit feedback.
                    </p>
                    <Button
                      className="w-full bg-secondary text-primary hover:bg-secondary/90"
                      onClick={() => navigate("/auth")}
                    >
                      Log In to Continue
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
              
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="grid grid-cols-6 mb-6">
                  <TabsTrigger value="all" onClick={() => setFilter("all")}>All</TabsTrigger>
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.value} 
                      value={category.value}
                      onClick={() => setFilter(category.value)}
                    >
                      <span className="hidden md:inline">{category.label}</span>
                      <span className="md:hidden"><category.icon className="h-4 w-4" /></span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              
              <div className="grid grid-cols-1 gap-6">
                {filteredTestimonials.length > 0 ? (
                  filteredTestimonials.map((testimonial) => (
                    <TestimonialCard
                      key={testimonial.id}
                      name={testimonial.name}
                      role={testimonial.role}
                      company={testimonial.company}
                      rating={testimonial.rating}
                      title={testimonial.title}
                      message={testimonial.message}
                      date={testimonial.date}
                      category={testimonial.category}
                      avatarSeed={testimonial.avatarSeed}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No testimonials found for this category.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}