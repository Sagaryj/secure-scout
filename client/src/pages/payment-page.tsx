import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import CardPayment from "@/components/card-payment";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CheckCircle2, CreditCard, Lock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const PaymentPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Get plan from URL parameters (in real app, would validate this)
  const searchParams = new URLSearchParams(window.location.search);
  const plan = searchParams.get("plan") || "professional";
  
  // Define plan details based on selection
  const planDetails = {
    professional: {
      name: "Professional Plan",
      description: "Monthly subscription for Professional Plan",
      amount: 4999, // ₹4,999 INR
      features: [
        "Full vulnerability scanning suite",
        "Unlimited scans",
        "Advanced reporting (PDF, DOCX, CSV)",
        "API access",
        "Email notifications"
      ]
    },
    enterprise: {
      name: "Enterprise Plan",
      description: "Monthly subscription for Enterprise Plan",
      amount: 24999, // ₹24,999 INR
      features: [
        "Everything in Professional",
        "Team management",
        "SAML/SSO Integration",
        "Custom vulnerability checks",
        "Priority support"
      ]
    }
  };
  
  // Default to professional if invalid plan is passed
  const selectedPlan = planDetails[plan as keyof typeof planDetails] || planDetails.professional;

  const handlePaymentSuccess = (transactionId: string) => {
    setPaymentSuccess(true);
    
    toast({
      title: "Payment Successful!",
      description: `Your ${selectedPlan.name} has been activated.`,
      variant: "default",
    });
    
    // In a real application, you would:
    // 1. Verify the payment on your server
    // 2. Update the user's subscription status
    // 3. Store payment details in your database
    
    // After a short delay, redirect to dashboard
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const handlePaymentFailure = (error: any) => {
    toast({
      title: "Payment Failed",
      description: "There was an issue processing your payment. Please try again.",
      variant: "destructive",
    });
  };

  return (
    <>
      <Helmet>
        <title>Complete Payment | SecureScout</title>
      </Helmet>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-8">
          <Link href="/pricing" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Pricing
          </Link>
          <h1 className="text-3xl font-bold mb-2">Complete Your Purchase</h1>
          <p className="text-muted-foreground">You're just one step away from securing your digital assets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="md:col-span-2">
            {paymentSuccess ? (
              <Card className="border-secondary/20 bg-primary/50 backdrop-blur-md">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Thank you for subscribing to the {selectedPlan.name}.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    You'll be redirected to your dashboard shortly, or you can click the button below.
                  </p>
                  <Button 
                    onClick={() => navigate("/dashboard")}
                    className="bg-secondary text-primary hover:bg-secondary/90"
                  >
                    Go to Dashboard
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <CardPayment
                amount={selectedPlan.amount / 100} // Convert to USD from cents
                planName={selectedPlan.name}
                description={selectedPlan.description}
                onSuccess={handlePaymentSuccess}
                onFailure={handlePaymentFailure}
              />
            )}
            
            <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Lock className="h-4 w-4 mr-1" />
                <span>Secure Payment</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-muted-foreground/30" />
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                <span>Data Protection</span>
              </div>
              <Separator orientation="vertical" className="h-4 bg-muted-foreground/30" />
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                <span>Encrypted Transaction</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="bg-primary/50 backdrop-blur-md border-secondary/20 sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{selectedPlan.name}</span>
                    <span>₹{(selectedPlan.amount / 100).toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Monthly subscription</p>
                  
                  <Separator className="my-4 bg-secondary/10" />
                  
                  <div className="space-y-2 mb-6">
                    <h4 className="text-sm font-medium mb-2">Included in your plan:</h4>
                    <ul className="space-y-1.5">
                      {selectedPlan.features.map((feature, index) => (
                        <li key={index} className="text-sm flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-secondary mr-2 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator className="my-4 bg-secondary/10" />
                  
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{(selectedPlan.amount / 100).toFixed(2)}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Billed monthly. You can cancel anytime.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;