import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import DashboardPage from "@/pages/dashboard-page";
import PricingPage from "@/pages/pricing-page";
import ExpertsPage from "@/pages/experts-page";
import ScanBasicPage from "@/pages/scan-basic-page";
import ScanDeepPage from "@/pages/scan-deep-page";
import ContactPage from "@/pages/contact-page";
import PaymentPage from "@/pages/payment-page";
import FeedbackPage from "@/pages/feedback-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";
import Header from "./components/header";
import Footer from "./components/footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/experts" component={ExpertsPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/scan/basic" component={ScanBasicPage} />
      <Route path="/scan/free" component={ScanBasicPage} />
      <Route path="/scan/deep" component={ScanDeepPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/feedback" component={FeedbackPage} />
      <ProtectedRoute path="/dashboard" component={DashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
