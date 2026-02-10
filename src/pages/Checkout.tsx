import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Checkout = () => {
  const { items, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Link to="/products" className="text-primary hover:underline text-sm mt-2 inline-block">Back to shop</Link>
      </div>
    );
  }

  const steps = ["Cart", "Shipping", "Payment", "Confirmation"];
  const currentStep = 1;

  return (
    <div className="container py-8 max-w-5xl">
      <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to cart
      </Link>

      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`flex items-center justify-center h-8 w-8 rounded-full text-xs font-bold border ${i <= currentStep ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground"}`}>
              {i + 1}
            </div>
            <span className={`text-xs hidden sm:inline ${i <= currentStep ? "text-foreground" : "text-muted-foreground"}`}>{step}</span>
            {i < steps.length - 1 && <div className={`w-8 h-px ${i < currentStep ? "bg-primary" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="font-display text-xl font-bold text-foreground">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: "name", label: "Full Name", placeholder: "John Doe", span: 2 },
              { id: "email", label: "Email", placeholder: "john@example.com", type: "email" },
              { id: "phone", label: "Phone", placeholder: "+1 (555) 123-4567", type: "tel" },
              { id: "address", label: "Street Address", placeholder: "123 Main Street", span: 2 },
              { id: "apt", label: "Apt / Suite", placeholder: "Apt 4B" },
              { id: "city", label: "City", placeholder: "New York" },
              { id: "state", label: "State", placeholder: "NY" },
              { id: "zip", label: "ZIP Code", placeholder: "10001" },
              { id: "country", label: "Country", placeholder: "United States", span: 2 },
            ].map(({ id, label, placeholder, type, span }) => (
              <div key={id} className={span === 2 ? "sm:col-span-2" : ""}>
                <Label htmlFor={id} className="text-xs text-muted-foreground">{label}</Label>
                <Input id={id} type={type || "text"} placeholder={placeholder} className="mt-1 bg-secondary border-border" />
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">Payment</h2>
            <div className="rounded-md bg-secondary border border-border p-6 text-center">
              <p className="text-sm text-muted-foreground">Payment integration will be available soon.</p>
            </div>
          </div>

          <Button className="w-full bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 h-11">
            Place Order
          </Button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border border-border bg-card p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-md overflow-hidden bg-secondary shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-primary">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold text-foreground">
              <span>Total</span>
              <span className="text-primary font-display">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
