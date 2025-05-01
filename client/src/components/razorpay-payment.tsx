import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Check, AlertCircle } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  amount: number; // in INR
  name: string;
  description: string;
  orderId?: string;
  email?: string;
  contact?: string;
  onSuccess?: (paymentId: string, orderId: string, signature: string) => void;
  onFailure?: (error: any) => void;
}

const RazorpayPayment = ({
  amount,
  name,
  description,
  orderId = "order_" + Math.random().toString(36).substring(2, 15),
  email = "",
  contact = "",
  onSuccess,
  onFailure
}: RazorpayPaymentProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      document.body.appendChild(script);
    };
    
    loadRazorpay();
    
    return () => {
      // Clean up if needed
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        // Do not remove the script as it might be used by other components
      }
    };
  }, []);

  const handlePayment = useCallback(() => {
    setLoading(true);
    setPaymentError(null);
    
    // For demo purposes, we're simulating the order creation
    // In a real application, you would call your backend to create an order
    
    if (!razorpayLoaded) {
      setPaymentError("Razorpay is still loading. Please try again in a moment.");
      setLoading(false);
      return;
    }
    
    try {
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyId", // Replace with your Razorpay Key ID
        amount: amount * 100, // Amount in paisa
        currency: "INR",
        name: name,
        description: description,
        order_id: orderId,
        handler: function(response: any) {
          // Handle successful payment
          setPaymentSuccess(true);
          setLoading(false);
          
          toast({
            title: "Payment Successful",
            description: `Your payment of ₹${amount} was successful`,
            variant: "default",
          });
          
          if (onSuccess) {
            onSuccess(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          }
        },
        prefill: {
          email: email,
          contact: contact,
        },
        theme: {
          color: "#64FFDA",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          },
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Razorpay error:", error);
      setPaymentError("An error occurred while initializing the payment. Please try again.");
      setLoading(false);
      
      if (onFailure) {
        onFailure(error);
      }
    }
  }, [amount, name, description, orderId, email, contact, onSuccess, onFailure, razorpayLoaded, toast]);

  if (paymentSuccess) {
    return (
      <Card className="border-secondary/20 bg-primary/50 backdrop-blur-md">
        <CardContent className="p-6 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Successful</h3>
          <p className="text-muted-foreground mb-4">
            Your payment of ₹{amount} has been processed successfully.
          </p>
          <p className="text-xs text-muted-foreground">
            Order ID: {orderId}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-secondary/20 bg-primary/50 backdrop-blur-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Secure Payment</h3>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-secondary" />
            <span className="text-sm font-medium">Razorpay</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-muted-foreground">Amount</span>
            <span className="font-semibold">₹{amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Description</span>
            <span>{description}</span>
          </div>
        </div>
        
        {paymentError && (
          <div className="mb-4 p-3 bg-accent/10 border border-accent/20 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-accent mr-2 mt-0.5" />
            <p className="text-sm">{paymentError}</p>
          </div>
        )}
        
        <Button 
          onClick={handlePayment}
          className="w-full bg-secondary text-primary hover:bg-secondary/90"
          disabled={loading || !razorpayLoaded}
        >
          {loading ? (
            <>
              <span className="animate-spin mr-2">⟳</span>
              Processing...
            </>
          ) : (
            <>Pay ₹{amount.toFixed(2)} Securely</>
          )}
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-4">
          Secured by Razorpay. Your payment information is encrypted and secure.
        </p>
      </CardContent>
    </Card>
  );
};

export default RazorpayPayment;