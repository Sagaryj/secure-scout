import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Star } from "lucide-react";

// Define the schema for the feedback form
const feedbackSchema = z.object({
  rating: z.string().min(1, "Please select a rating"),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(500, "Comment must be less than 500 characters"),
});

type FeedbackValues = z.infer<typeof feedbackSchema>;

// Sample testimonial data (in a real app, this would come from an API)
const testimonials = [
  {
    id: 1,
    name: "Sarah Thompson",
    title: "CISO",
    company: "Financial Services Inc.",
    rating: 5,
    comment: "SecureScout has transformed our security posture. The deep scan feature identified vulnerabilities that our previous tools missed completely. Within 3 months of implementing their recommendations, we've reduced our attack surface by 70%."
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "IT Security Manager",
    company: "Global Retail Solutions",
    rating: 5,
    comment: "I've used many security scanners, but SecureScout's precision and detailed remediation advice is unmatched. Their expert consultation was worth every penny - they found critical issues in our API authentication that could have led to a major breach."
  },
  {
    id: 3,
    name: "Jessica Patel",
    title: "Security Engineer",
    company: "HealthTech Innovations",
    rating: 4,
    comment: "Working in healthcare means security is non-negotiable. SecureScout has been instrumental in helping us maintain HIPAA compliance and keeping patient data safe. Their team is responsive and knowledgeable."
  },
  {
    id: 4,
    name: "David Rodriguez",
    title: "DevOps Lead",
    company: "Fintech Solutions Ltd",
    rating: 5,
    comment: "We've integrated SecureScout into our CI/CD pipeline, and it's been a game-changer. Catch security issues before deployment, saving us countless hours and potential incidents. The API is robust and well-documented."
  },
];

// Star rating component
const StarRating = ({ rating, onChange, interactive = false }: { 
  rating: number, 
  onChange?: (rating: number) => void,
  interactive?: boolean 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-6 w-6 ${
            star <= (hoverRating || rating) 
              ? "fill-secondary text-secondary" 
              : "text-secondary/40"
          } ${interactive ? "cursor-pointer" : ""}`}
          onClick={() => {
            if (interactive && onChange) {
              onChange(star);
            }
          }}
          onMouseEnter={() => {
            if (interactive) {
              setHoverRating(star);
            }
          }}
          onMouseLeave={() => {
            if (interactive) {
              setHoverRating(0);
            }
          }}
        />
      ))}
    </div>
  );
};

// Testimonial card component
const TestimonialCard = ({ 
  comment, 
  rating, 
  name, 
  title, 
  company 
}: { 
  comment: string, 
  rating: number, 
  name: string, 
  title: string, 
  company: string 
}) => {
  return (
    <Card className="bg-primary/30 backdrop-blur-sm border-secondary/20">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
            <CardDescription>{title}, {company}</CardDescription>
          </div>
          <StarRating rating={rating} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic">{comment}</p>
      </CardContent>
    </Card>
  );
};

export default function FeedbackPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: "",
      comment: "",
    },
  });

  function onSubmit(values: FeedbackValues) {
    // In a real app, this would send the data to an API
    console.log(values);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
    form.reset();
    setSelectedRating(0);
  }

  return (
    <>
      <div className="container py-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Customer Feedback</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Read what our clients have to say about SecureScout's security solutions and share your own experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              comment={testimonial.comment}
              rating={testimonial.rating}
              name={testimonial.name}
              title={testimonial.title}
              company={testimonial.company}
            />
          ))}
        </div>

        <div className="bg-primary/30 backdrop-blur-sm border border-secondary/20 rounded-xl p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h2>
          
          {user ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Rating</FormLabel>
                      <div className="mb-2">
                        <StarRating 
                          rating={selectedRating} 
                          onChange={(rating) => {
                            setSelectedRating(rating);
                            field.onChange(rating.toString());
                          }}
                          interactive={true}
                        />
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Feedback</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your experience with our services..."
                          className="resize-none bg-background/50 border-secondary/30"
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
                  Submit Feedback
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center p-6 bg-background/30 rounded-lg border border-secondary/10">
              <p className="text-lg mb-4">Please login to share your feedback</p>
              <Button 
                onClick={() => window.location.href = "/auth"}
                className="bg-secondary text-primary hover:bg-secondary/90"
              >
                Login to Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}