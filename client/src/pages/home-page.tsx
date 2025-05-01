import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ToolsSection from "@/components/tools-section";
import PricingSection from "@/components/pricing-section";
import ExpertsSection from "@/components/experts-section";
import TestimonialsSection from "@/components/testimonials-section";
import CTASection from "@/components/cta-section";
import { Helmet } from "react-helmet";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>SecureScout - Professional Security Testing Platform</title>
        <meta name="description" content="Get a hacker's perspective on your web apps, network, and cloud with SecureScout's professional security testing platform." />
      </Helmet>
      
      <HeroSection />
      <FeaturesSection />
      <ToolsSection />
      <TestimonialsSection />
      <PricingSection />
      <ExpertsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
