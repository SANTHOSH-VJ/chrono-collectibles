import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="text-gradient-gold font-display text-lg font-bold mb-3">Heritage Coins</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Curating the finest collectible coins and paper currency for discerning collectors since 1987.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Shop All", to: "/products" },
                { label: "Old Coins", to: "/products?category=coins" },
                { label: "Paper Currency", to: "/products?category=currency" },
              ].map((link) => (
                <Link key={link.label} to={link.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Customer Service</h4>
            <div className="flex flex-col gap-2">
              {["Shipping & Returns", "Authenticity Guarantee", "FAQ", "Contact Us"].map((label) => (
                <span key={label} className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3">Get in Touch</h4>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@heritagecoins.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Heritage Coins. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
