import { Link } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { Shield, Truck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import heroBg from "@/assets/hero-bg.jpg";
import categoryCoins from "@/assets/category-coins.jpg";
import categoryCurrency from "@/assets/category-currency.jpg";
import { useState, useEffect } from "react";
import AuthModal from "@/components/AuthModal";
import { useAuth } from "@/contexts/AuthContext";

const featuredProducts = products.slice(0, 6);

const Index = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    // Show auth modal on first visit per session (not if already logged in)
    if (!user && !sessionStorage.getItem("auth_modal_shown")) {
      const timer = setTimeout(() => {
        setShowAuthModal(true);
        sessionStorage.setItem("auth_modal_shown", "1");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div className="flex flex-col">
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onGuestContinue={() => setShowAuthModal(false)}
        />
      )}
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="Collectible coins" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 container text-center px-4 animate-fade-in">
          <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">
            Est. 1987 · Expert Curation
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            Discover History's <br />
            <span className="text-gradient-gold">Finest Collectibles</span>
          </h1>
          <p className="max-w-xl mx-auto text-muted-foreground mb-8 text-base sm:text-lg">
            Rare coins and vintage currency, authenticated and curated for the discerning collector.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-gold text-primary-foreground font-semibold px-8 shadow-gold hover:opacity-90 transition-opacity">
                Explore Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, year, or country..."
                className="w-full rounded-md border border-border bg-background/60 backdrop-blur pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y border-border bg-card">
        <div className="container py-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Shield, label: "Authenticity Guaranteed", desc: "Every item certified and verified" },
              { icon: Truck, label: "Secure Shipping", desc: "Insured and tracked worldwide" },
              { icon: Award, label: "Expert Curation", desc: "Handpicked by numismatic experts" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <Icon className="h-7 w-7 text-primary" />
                <h3 className="font-display text-sm font-semibold text-foreground">{label}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="font-display text-3xl font-bold text-center mb-10 text-foreground">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {[
            { name: "Old Coins", slug: "coins", image: categoryCoins },
            { name: "Paper Currency", slug: "currency", image: categoryCurrency },
          ].map((cat) => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden shadow-card border border-border"
            >
              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-hero" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <h3 className="font-display text-2xl font-bold text-foreground">{cat.name}</h3>
                <span className="text-sm text-primary mt-2 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-card border-y border-border">
        <div className="container py-16">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Items</h2>
            <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16 text-center">
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">Stay in the Loop</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
          Get notified about new arrivals, exclusive offers, and collector insights.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full rounded-md border border-border bg-secondary px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button className="bg-gradient-gold text-primary-foreground font-semibold shrink-0 shadow-gold hover:opacity-90">
            Subscribe
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
