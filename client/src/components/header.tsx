import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/use-auth";
import { 
  ChevronDown, 
  LogOut, 
  Menu, 
  Shield, 
  User, 
  X
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = () => {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const isActive = (path: string) => location === path;

  return (
    <header className="bg-primary/90 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-secondary to-accent glow-effect">
                <div className="absolute inset-1 bg-primary rounded-full flex items-center justify-center">
                  <Shield className="text-secondary text-sm" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Secure<span className="text-secondary">Scout</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              Home
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm font-medium transition-colors ${isActive('/pricing') ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              Pricing
            </Link>
            <Link 
              href="/experts" 
              className={`text-sm font-medium transition-colors ${isActive('/experts') ? 'text-secondary' : 'hover:text-secondary'}`}
            >
              Security Experts
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-secondary/30 hover:border-secondary/60 flex items-center">
                    <span className="mr-2">{user.username}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-primary border-secondary/30">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => logoutMutation.mutate()}
                    className="cursor-pointer text-accent"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="link" className="text-foreground hover:text-secondary">
                    Log in
                  </Button>
                </Link>
                <Link href="/auth?tab=register">
                  <Button className="bg-secondary text-primary hover:bg-secondary/90">
                    Sign up free
                  </Button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden border-secondary/30">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-primary text-foreground border-secondary/30">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-secondary to-accent glow-effect">
                      <div className="absolute inset-1 bg-primary rounded-full flex items-center justify-center">
                        <Shield className="text-secondary text-sm" />
                      </div>
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                      Secure<span className="text-secondary">Scout</span>
                    </span>
                  </Link>
                  <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </SheetClose>
                </div>
                <Separator className="my-4 bg-secondary/20" />
                <nav className="flex flex-col space-y-4 flex-1">
                  <SheetClose asChild>
                    <Link 
                      href="/" 
                      className={`text-lg font-medium transition-colors ${isActive('/') ? 'text-secondary' : ''}`}
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/pricing" 
                      className={`text-lg font-medium transition-colors ${isActive('/pricing') ? 'text-secondary' : ''}`}
                    >
                      Pricing
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link 
                      href="/experts" 
                      className={`text-lg font-medium transition-colors ${isActive('/experts') ? 'text-secondary' : ''}`}
                    >
                      Security Experts
                    </Link>
                  </SheetClose>
                  
                  {user && (
                    <SheetClose asChild>
                      <Link 
                        href="/dashboard" 
                        className={`text-lg font-medium transition-colors ${isActive('/dashboard') ? 'text-secondary' : ''}`}
                      >
                        Dashboard
                      </Link>
                    </SheetClose>
                  )}
                </nav>
                
                <div className="mt-auto py-4">
                  {user ? (
                    <div className="space-y-4">
                      <p className="text-foreground">Logged in as <span className="font-medium text-secondary">{user.username}</span></p>
                      <SheetClose asChild>
                        <Button 
                          onClick={() => logoutMutation.mutate()}
                          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </SheetClose>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <SheetClose asChild>
                        <Link href="/auth">
                          <Button variant="outline" className="w-full border-secondary/30">
                            Log in
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link href="/auth?tab=register">
                          <Button className="w-full bg-secondary text-primary hover:bg-secondary/90">
                            Sign up free
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
