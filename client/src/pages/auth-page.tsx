import { useEffect } from "react";
import { useLocation, useSearch, useNavigate } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ThreeScene from "@/components/three-scene";
import { useAuth, extendedRegisterSchema } from "@/hooks/use-auth";
import { loginSchema } from "@shared/schema";
import { Shield } from "lucide-react";

const AuthPage = () => {
  const [location, navigate] = useLocation();
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const defaultTab = params.get("tab") === "register" ? "register" : "login";
  
  const { user, loginMutation, registerMutation } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<z.infer<typeof extendedRegisterSchema>>({
    resolver: zodResolver(extendedRegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      company: "",
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    loginMutation.mutate(values);
  }

  function onRegisterSubmit(values: z.infer<typeof extendedRegisterSchema>) {
    registerMutation.mutate(values);
  }

  if (user) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-4rem)]">
      {/* Left column - Authentication form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-primary">
        <div className="w-full max-w-md">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>Login to your SecureScout account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="yourusername" 
                                {...field}
                                className="bg-background border-secondary/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                {...field}
                                className="bg-background border-secondary/30" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-secondary text-primary hover:bg-secondary/90"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account? 
                    <Button variant="link" onClick={() => loginForm.reset()} className="text-secondary p-0 h-auto ml-1">
                      Register
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="border-secondary/20">
                <CardHeader>
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>Sign up for SecureScout to start securing your systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="yourusername" 
                                {...field}
                                className="bg-background border-secondary/30" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="you@example.com" 
                                {...field}
                                className="bg-background border-secondary/30" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                placeholder="••••••••" 
                                {...field}
                                className="bg-background border-secondary/30" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <FormField
                          control={registerForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="John Doe" 
                                  {...field}
                                  className="bg-background border-secondary/30" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={registerForm.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Acme Inc." 
                                  {...field}
                                  className="bg-background border-secondary/30" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-secondary text-primary hover:bg-secondary/90"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account? 
                    <Button variant="link" onClick={() => registerForm.reset()} className="text-secondary p-0 h-auto ml-1">
                      Login
                    </Button>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Right column - Hero section */}
      <div className="flex-1 relative hidden lg:flex flex-col items-center justify-center p-12 bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <ThreeScene />
        </div>
        
        <div className="relative z-10 max-w-md text-center">
          <div className="flex justify-center mb-6">
            <div className="relative h-16 w-16 rounded-full bg-gradient-to-r from-secondary to-accent glow-effect">
              <div className="absolute inset-2 bg-primary rounded-full flex items-center justify-center">
                <Shield className="text-secondary text-xl" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-6">
            Enhance Your <span className="text-secondary">Security Posture</span>
          </h2>
          
          <p className="text-muted-foreground mb-8">
            Join SecureScout to get professional-grade security testing tools, vulnerability scanning, and expert guidance to protect your digital assets from cyber threats.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <div className="h-5 w-5 text-secondary">🔍</div>
              </div>
              <div className="text-left">
                <h4 className="font-medium">Advanced Vulnerability Scanning</h4>
                <p className="text-sm text-muted-foreground">Detect vulnerabilities in web apps, networks, and cloud</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <div className="h-5 w-5 text-secondary">📊</div>
              </div>
              <div className="text-left">
                <h4 className="font-medium">Comprehensive Reporting</h4>
                <p className="text-sm text-muted-foreground">Get detailed reports with actionable recommendations</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-secondary/10 w-10 h-10 rounded-full flex items-center justify-center mr-4">
                <div className="h-5 w-5 text-secondary">👩‍💻</div>
              </div>
              <div className="text-left">
                <h4 className="font-medium">Expert Security Assistance</h4>
                <p className="text-sm text-muted-foreground">Access to security professionals for guidance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
