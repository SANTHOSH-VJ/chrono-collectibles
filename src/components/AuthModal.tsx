import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2, ArrowRight } from "lucide-react";

interface AuthModalProps {
    onClose: () => void;
    onGuestContinue?: () => void;
    defaultTab?: "login" | "signup";
}

const AuthModal = ({ onClose, onGuestContinue, defaultTab = "login" }: AuthModalProps) => {
    const [tab, setTab] = useState<"login" | "signup">(defaultTab);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (tab === "login") {
                await signIn(form.email, form.password);
                onClose();

                // Get the updated state from auth context indirectly or just check if it was successful
                // Since we don't have the updated isAdmin here easily without a separate effect 
                // or returning it from signIn, we can use the location to decide.
                // If they are on the home page, redirect to products.
                if (window.location.pathname === "/") {
                    navigate("/products");
                }
            } else {
                await signUp(form.email, form.password, form.name);
                setTab("login");
            }
        } catch {
            // errors shown via toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative px-8 pt-8 pb-6 text-center border-b border-border">
                    <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                    <div className="h-12 w-12 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-3">
                        <span className="text-lg font-bold text-primary-foreground">HC</span>
                    </div>
                    <h2 className="text-xl font-bold font-display text-foreground">Heritage Coins</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {tab === "login" ? "Welcome back! Sign in to continue." : "Create your collector account."}
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border">
                    <button
                        onClick={() => setTab("login")}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === "login" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setTab("signup")}
                        className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === "signup" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-6 space-y-4">
                    {tab === "signup" && (
                        <div>
                            <Label htmlFor="name" className="text-xs text-muted-foreground">Full Name</Label>
                            <Input id="name" placeholder="John Doe" className="mt-1 bg-secondary border-border" value={form.name} onChange={handleChange} required />
                        </div>
                    )}
                    <div>
                        <Label htmlFor="email" className="text-xs text-muted-foreground">Email Address</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="mt-1 bg-secondary border-border" value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label htmlFor="password" className="text-xs text-muted-foreground">Password</Label>
                        <Input id="password" type="password" placeholder="••••••••" className="mt-1 bg-secondary border-border" value={form.password} onChange={handleChange} required minLength={6} />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90 mt-2">
                        {loading ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...</>
                        ) : tab === "login" ? "Sign In" : "Create Account"}
                    </Button>
                </form>

                {/* Guest Option */}
                {onGuestContinue && (
                    <div className="px-8 pb-6 text-center">
                        <div className="relative mb-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                            <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
                        </div>
                        <button
                            onClick={onGuestContinue}
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 mx-auto group"
                        >
                            Continue browsing as guest
                            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                        <p className="text-[11px] text-muted-foreground mt-2">You'll be asked to sign in when you checkout</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
