import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    BarChart3,
    LogOut,
    ChevronRight,
    Boxes,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard, end: true },
    { label: "Products", to: "/admin/products", icon: Package },
    { label: "Orders", to: "/admin/orders", icon: ShoppingBag },
    { label: "Inventory", to: "/admin/inventory", icon: Boxes },
    { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
];

const AdminLayout = () => {
    const { profile, signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch {
            // ignore — signOut clears local state regardless
        }
        // Hard redirect so all React state (auth, cache) is fully reset
        window.location.href = "/login";
    };

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 border-r border-border bg-card flex flex-col">
                {/* Logo */}
                <div className="px-6 py-5 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                            <span className="text-xs font-bold text-primary-foreground">HC</span>
                        </div>
                        <div>
                            <p className="text-sm font-bold text-foreground font-display">Heritage Coins</p>
                            <p className="text-[10px] text-primary uppercase tracking-widest">Admin Portal</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-4 space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : ""}`} />
                                    <span className="flex-1">{item.label}</span>
                                    {isActive && <ChevronRight className="h-3 w-3 text-primary" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User */}
                <div className="px-3 py-4 border-t border-border">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-primary-foreground">
                                {profile?.full_name?.charAt(0)?.toUpperCase() || "A"}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">{profile?.full_name || "Admin"}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{profile?.email}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
                        onClick={handleSignOut}
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
