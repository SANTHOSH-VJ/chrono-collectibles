import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Minus, Plus, Shield, Award, Truck } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

const rarityStars: Record<string, number> = {
  Common: 1, Uncommon: 2, Rare: 3, "Very Rare": 4, "Extremely Rare": 5,
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-primary hover:underline text-sm mt-2 inline-block">Back to shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);
  const stars = rarityStars[product.rarityLevel] ?? 1;

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: qty,
      image: product.images[0],
      condition: product.condition,
      year: product.year,
    });
    toast({ title: "Added to cart", description: `${product.name} × ${qty}` });
  };

  return (
    <div className="container py-8">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-secondary border border-border">
          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            {product.category === "coins" ? "Old Coins" : "Paper Currency"}
          </p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < stars ? "fill-primary text-primary" : "text-border"}`} />
              ))}
            </div>
            <Badge variant="secondary" className="text-xs">{product.rarityLevel}</Badge>
            <Badge variant="outline" className="text-xs">{product.condition}</Badge>
          </div>

          <p className="text-4xl font-display font-bold text-primary mb-6">
            ${product.price.toLocaleString()}
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 text-sm mb-6">
            {product.stockQuantity > 0 ? (
              <span className="text-emerald-400">● In Stock ({product.stockQuantity} available)</span>
            ) : (
              <span className="text-destructive">● Out of Stock</span>
            )}
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-border rounded-md">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.min(product.stockQuantity, qty + 1))}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleAdd}
              disabled={product.stockQuantity === 0}
              className="flex-1 bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 transition-opacity h-10"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3 text-center border-t border-border pt-6">
            {[
              { icon: Shield, label: "Certified" },
              { icon: Award, label: "Expert Graded" },
              { icon: Truck, label: "Insured Shipping" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-[10px] text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="specs" className="mt-12">
        <TabsList className="bg-secondary border border-border">
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="auth">Authenticity</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              ["Year", String(product.year)],
              ["Country", product.country],
              ["Condition", product.condition],
              ["Rarity", product.rarityLevel],
              ["Category", product.category === "coins" ? "Old Coins" : "Paper Currency"],
              ["Stock", String(product.stockQuantity)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-md bg-secondary p-3 border border-border">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{k}</p>
                <p className="text-sm font-medium text-foreground mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="auth" className="mt-4">
          <div className="rounded-md bg-secondary p-6 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.certificationDetails || "This item comes with our standard Heritage Coins authenticity guarantee. Every piece is examined by our team of numismatic experts before listing."}
            </p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
