import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Lock, CreditCard, Calendar, User } from "lucide-react";

// Credit card payment form schema
const paymentFormSchema = z.object({
  cardholderName: z.string().min(2, "Name is required"),
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Card number must be valid")
    .regex(/^[0-9\s]+$/, "Card number must contain only digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z
    .string()
    .min(3, "CVV must be 3 or 4 digits")
    .max(4, "CVV must be 3 or 4 digits")
    .regex(/^\d+$/, "CVV must contain only digits"),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface CardPaymentProps {
  amount: number; // in $ USD
  planName: string;
  description: string;
  onSuccess?: (transactionId: string) => void;
  onFailure?: (error: any) => void;
}

export default function CardPayment({
  amount,
  planName,
  description,
  onSuccess,
  onFailure,
}: CardPaymentProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, navigate] = useLocation();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function formatCardNumber(value: string) {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add a space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  }

  function handleCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCardNumber(e.target.value);
    form.setValue("cardNumber", formatted);
  }

  function handleExpiryDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value.replace(/\D/g, "");
    
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    
    form.setValue("expiryDate", value);
  }

  function onSubmit(data: PaymentFormValues) {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your payment",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsProcessing(true);

    // In a real application, this would be a call to a payment processor API
    setTimeout(() => {
      try {
        // Mock successful payment
        const transactionId = "txn_" + Math.random().toString(36).substring(2, 15);
        
        toast({
          title: "Payment Successful",
          description: `Your payment of $${amount.toFixed(2)} has been processed successfully.`,
        });
        
        setIsProcessing(false);
        form.reset();
        
        if (onSuccess) {
          onSuccess(transactionId);
        }
      } catch (error) {
        setIsProcessing(false);
        
        toast({
          title: "Payment Failed",
          description: "There was an error processing your payment. Please try again.",
          variant: "destructive",
        });
        
        if (onFailure) {
          onFailure(error);
        }
      }
    }, 2000);
  }

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto bg-primary/30 backdrop-blur-md border-secondary/20">
        <CardHeader>
          <CardTitle className="text-xl">Authentication Required</CardTitle>
          <CardDescription>
            Please login to complete your payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={() => navigate("/auth")}
            className="w-full bg-secondary text-primary hover:bg-secondary/90"
          >
            Login to Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-primary/30 backdrop-blur-md border-secondary/20">
      <CardHeader>
        <CardTitle className="text-xl">Payment Details</CardTitle>
        <CardDescription>
          {description} - ${amount.toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardholderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cardholder Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="John Doe"
                        className="pl-10 bg-background/50"
                        {...field}
                        disabled={isProcessing}
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="1234 5678 9012 3456"
                        className="pl-10 bg-background/50"
                        maxLength={19}
                        {...field}
                        onChange={(e) => {
                          handleCardNumberChange(e);
                          field.onChange(e);
                        }}
                        disabled={isProcessing}
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="MM/YY"
                          className="pl-10 bg-background/50"
                          maxLength={5}
                          {...field}
                          onChange={(e) => {
                            handleExpiryDateChange(e);
                            field.onChange(e);
                          }}
                          disabled={isProcessing}
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="password"
                          placeholder="123"
                          className="pl-10 bg-background/50"
                          maxLength={4}
                          {...field}
                          disabled={isProcessing}
                        />
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-secondary text-primary hover:bg-secondary/90"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center">
                    <span className="animate-spin mr-2">⟳</span>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Pay $${amount.toFixed(2)}`
                )}
              </Button>
            </div>

            <div className="text-xs text-center text-muted-foreground flex items-center justify-center mt-4">
              <Lock className="h-3 w-3 mr-1" />
              <span>Your payment information is secure</span>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}