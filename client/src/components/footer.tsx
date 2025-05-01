import { Link } from "wouter";
import { Shield, Twitter, Linkedin, Github, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-background pt-20 pb-10 border-t border-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-secondary to-accent glow-effect">
                <div className="absolute inset-1 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="text-secondary text-sm" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Secure<span className="text-secondary">Scout</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Professional security testing platform for businesses of all sizes. Get a hacker's perspective on your web apps, network, and cloud.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Security Tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-secondary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-secondary transition-colors">
                  For Teams
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-secondary transition-colors">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Security Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Webinars
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors">
                  Trust & Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-secondary/20" />
        
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} SecureScout. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-secondary transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
