import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Minus, Plus, Shield, Award, Truck } from "lucide-react";
import { useState, useMemo } from "react";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";

const rarityStars: Record<string, number> = {
  Common: 1, Uncommon: 2, Rare: 3, "Very Rare": 4, "Extremely Rare": 5,
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug || "");
  const { data: allProducts } = useProducts();
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();

  // Get related products from same category
  const related = useMemo(() => {
    if (!product || !allProducts) return [];
    return allProducts
      .filter((p) => p.category_id === product.category_id && p.id !== product.id)
      .slice(0, 3);
  }, [product, allProducts]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <Skeleton className="h-4 w-32 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/products" className="text-primary hover:underline text-sm mt-2 inline-block">Back to shop</Link>
      </div>
    );
  }

  const stars = rarityStars[product.rarity_level || "Common"] ?? 1;
  const categoryName = product.category?.name || (product.category_id === 1 ? "Old Coins" : "Paper Currency");

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: qty,
      image: product.images[0] || "",
      condition: product.condition || "Good",
      year: product.year || 0,
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
            {categoryName}
          </p>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < stars ? "fill-primary text-primary" : "text-border"}`} />
              ))}
            </div>
            <Badge variant="secondary" className="text-xs">{product.rarity_level}</Badge>
            <Badge variant="outline" className="text-xs">{product.condition}</Badge>
          </div>

          <p className="text-4xl font-display font-bold text-primary mb-6">
            ${Number(product.price).toLocaleString()}
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          <div className="flex items-center gap-2 text-sm mb-6">
            {product.stock_quantity > 0 ? (
              <span className="text-emerald-400">● In Stock ({product.stock_quantity} available)</span>
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
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQty(Math.min(product.stock_quantity, qty + 1))}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={handleAdd}
              disabled={product.stock_quantity === 0}
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
              ["Year", String(product.year || "N/A")],
              ["Country", product.country || "N/A"],
              ["Condition", product.condition || "N/A"],
              ["Rarity", product.rarity_level || "N/A"],
              ["Category", categoryName],
              ["Stock", String(product.stock_quantity)],
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
              {product.certification_details || "This item comes with our standard Heritage Coins authenticity guarantee. Every piece is examined by our team of numismatic experts before listing."}
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
