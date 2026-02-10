import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground text-sm mb-6">Browse our collection and find something extraordinary.</p>
        <Link to="/products">
          <Button className="bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90">
            Browse Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Continue Shopping
      </Link>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <div className="h-20 w-20 shrink-0 rounded-md overflow-hidden bg-secondary">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item.name}`} className="font-display text-sm font-semibold text-foreground hover:text-primary line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">{item.year} · {item.condition}</p>
                <p className="text-sm font-bold text-primary mt-1">${item.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex items-center border border-border rounded-md">
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-lg border border-border bg-card p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          <div className="border-t border-border mt-4 pt-4 flex justify-between text-foreground font-bold">
            <span>Total</span>
            <span className="text-primary font-display text-xl">${total.toLocaleString()}</span>
          </div>
          <Link to="/checkout" className="block mt-6">
            <Button className="w-full bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 h-11">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
