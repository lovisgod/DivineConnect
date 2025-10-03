import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Church, Home, Mic, BookOpen, Info, Mail } from "lucide-react";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Messages", href: "/messages", icon: Mic },
  { name: "Devotions", href: "/devotions", icon: BookOpen },
  { name: "About", href: "/about", icon: Info },
  { name: "Bible", href: "/bible", icon: BookOpen },
  { name: "Contact", href: "/contact", icon: Mail },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-md relative z-50" data-testid="header">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home-logo">
            <Church className="text-2xl text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Adorned Church</h1>
              <p className="text-sm text-muted-foreground">Community</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" data-testid="nav-desktop">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  location === item.href
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
                data-testid={`link-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden"
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64" data-testid="sheet-mobile-menu">
              <div className="flex items-center space-x-3 mb-8">
                <Church className="text-xl text-primary" />
                <div>
                  <h2 className="font-semibold text-primary">Adorned Church</h2>
                  <p className="text-sm text-muted-foreground">Community</p>
                </div>
              </div>
              <nav className="space-y-4" data-testid="nav-mobile">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 py-2 font-medium transition-colors ${
                        location === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.name.toLowerCase()}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
