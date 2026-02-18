import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { ProductWithImages } from "@/hooks/useProducts";
import { Badge } from "@/components/ui/badge";

const rarityStars: Record<string, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  "Very Rare": 4,
  "Extremely Rare": 5,
};

const conditionColor: Record<string, string> = {
  Poor: "bg-destructive/20 text-destructive",
  Fair: "bg-orange-500/20 text-orange-400",
  Fine: "bg-yellow-500/20 text-yellow-400",
  Good: "bg-blue-500/20 text-blue-400",
  "Very Good": "bg-emerald-500/20 text-emerald-400",
  Excellent: "bg-primary/20 text-primary",
  Uncirculated: "bg-primary/30 text-primary",
};

const ProductCard = ({ product }: { product: ProductWithImages }) => {
  const stars = rarityStars[product.rarity_level || "Common"] ?? 1;

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block rounded-lg border border-border bg-card overflow-hidden shadow-card transition-all duration-300 hover:border-primary/40 hover:shadow-gold"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <Badge className={`absolute top-3 left-3 text-[10px] font-semibold border-0 ${conditionColor[product.condition || "Good"]}`}>
          {product.condition}
        </Badge>
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <p className="text-xs text-muted-foreground">{product.year} · {product.country}</p>
        <h3 className="font-display text-sm font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${i < stars ? "fill-primary text-primary" : "text-border"}`}
            />
          ))}
          <span className="ml-1.5 text-[10px] text-muted-foreground">{product.rarity_level}</span>
        </div>
        <p className="text-lg font-bold text-primary font-display">
          ${product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
