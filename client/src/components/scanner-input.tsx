import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { scanRequestSchema } from "@shared/schema";
import { submitScan } from "@/lib/scan-utils";
import { Link, useLocation } from "wouter";
import ThreeScene from "./three-scene";

type ScannerProps = {
  onScanComplete?: (scanId: number) => void;
  className?: string;
  forceScanType?: "free" | "deep";
};

const Scanner = ({ onScanComplete, className = "", forceScanType }: ScannerProps) => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const form = useForm<z.infer<typeof scanRequestSchema>>({
    resolver: zodResolver(scanRequestSchema),
    defaultValues: {
      targetUrl: "",
      scanType: forceScanType === "deep" ? "deep" : "quick",
    },
  });

  const scanMutation = useMutation({
    mutationFn: submitScan,
    onSuccess: (data) => {
      toast({
        title: "Scan initiated",
        description: `Your scan has been started. Scan ID: ${data.id}`,
      });
      if (onScanComplete) {
        onScanComplete(data.id);
      }
      setIsScanning(false);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Scan failed",
        description: error.message || "There was an error starting your scan.",
        variant: "destructive",
      });
      setIsScanning(false);
    },
  });

  function onSubmit(values: z.infer<typeof scanRequestSchema>) {
    // If this is a deep scan and user is not logged in, redirect to pricing
    if (values.scanType === "deep" && !user) {
      navigate("/pricing");
      toast({
        title: "Subscription Required",
        description: "Deep scanning requires a subscription. Please see our pricing options.",
      });
      return;
    }

    setIsScanning(true);
    scanMutation.mutate(values);
  }

  return (
    <Card className={`bg-primary/80 backdrop-blur-md border-secondary/30 ${className}`}>
      <CardContent className="p-6">
        <div className="absolute -top-4 -right-4 bg-accent px-3 py-1 rounded-full text-xs font-medium">
          Free Scan
        </div>
        <h3 className="text-xl font-semibold mb-4">Quick Security Scan</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="targetUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL or IP Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Input
                        placeholder="https://example.com"
                        className="pl-10 pr-28 bg-background border-secondary/30 placeholder:text-muted-foreground/70 focus:ring-secondary/50 focus:border-secondary/50"
                        {...field}
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center">
                        <Button 
                          type="submit" 
                          className="h-full rounded-l-none bg-secondary text-primary hover:bg-secondary/90"
                          disabled={isScanning || scanMutation.isPending}
                        >
                          {isScanning || scanMutation.isPending ? 'Scanning...' : 'Scan Now'}
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="bg-primary/50 rounded-lg p-4 border border-secondary/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Scan Options</span>
                <span className="text-xs text-muted-foreground">Advanced settings</span>
              </div>
              
              <FormField
                control={form.control}
                name="scanType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="quick" id="quick" />
                          </FormControl>
                          <FormLabel htmlFor="quick" className="font-normal">
                            Quick Scan
                            <span className="block text-xs text-muted-foreground">5-10 minutes</span>
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="deep" id="deep" />
                          </FormControl>
                          <FormLabel htmlFor="deep" className="font-normal">
                            Deep Scan
                            <span className="block text-xs text-muted-foreground">30-60 minutes</span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="text-center text-xs text-muted-foreground">
              By using our scanner, you confirm this is your own website or you have permission to scan it
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Scanner;
