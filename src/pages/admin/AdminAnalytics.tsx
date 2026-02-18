import { useAllOrders, useOrderStats } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Package, Users } from "lucide-react";

const AdminAnalytics = () => {
    const { data: stats } = useOrderStats();
    const { data: orders } = useAllOrders();
    const { data: products } = useProducts();

    // Revenue by month (last 6 months)
    const monthlyRevenue = (() => {
        const months: Record<string, number> = {};
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
            months[key] = 0;
        }
        (orders || []).forEach((o) => {
            if (o.payment_status === "completed") {
                const d = new Date(o.created_at);
                const key = d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
                if (key in months) months[key] += Number(o.total_amount);
            }
        });
        return Object.entries(months);
    })();

    const maxRevenue = Math.max(...monthlyRevenue.map(([, v]) => v), 1);

    // Top products by order count
    const productSales: Record<string, { name: string; count: number; revenue: number }> = {};
    (orders || []).forEach((o) => {
        (o as any).order_items?.forEach((item: any) => {
            if (!productSales[item.product_name]) {
                productSales[item.product_name] = { name: item.product_name, count: 0, revenue: 0 };
            }
            productSales[item.product_name].count += item.quantity;
            productSales[item.product_name].revenue += item.price * item.quantity;
        });
    });
    const topProducts = Object.values(productSales)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    // Unique customers
    const uniqueCustomers = new Set((orders || []).map((o) => o.customer_email)).size;

    const avgOrderValue = stats?.totalOrders
        ? (stats.totalRevenue / stats.totalOrders).toFixed(0)
        : 0;

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-display text-foreground">Analytics</h1>
                <p className="text-sm text-muted-foreground mt-1">Business performance overview</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                    {
                        label: "Total Revenue",
                        value: `₹${(stats?.totalRevenue || 0).toLocaleString("en-IN")}`,
                        icon: DollarSign,
                        color: "from-amber-500 to-yellow-600",
                        trend: "+12%",
                        up: true,
                    },
                    {
                        label: "Total Orders",
                        value: stats?.totalOrders || 0,
                        icon: ShoppingBag,
                        color: "from-blue-500 to-blue-700",
                        trend: "+8%",
                        up: true,
                    },
                    {
                        label: "Avg Order Value",
                        value: `₹${Number(avgOrderValue).toLocaleString("en-IN")}`,
                        icon: TrendingUp,
                        color: "from-emerald-500 to-green-700",
                        trend: "+5%",
                        up: true,
                    },
                    {
                        label: "Unique Customers",
                        value: uniqueCustomers,
                        icon: Users,
                        color: "from-purple-500 to-purple-700",
                        trend: "+15%",
                        up: true,
                    },
                ].map((kpi) => (
                    <div key={kpi.label} className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-start justify-between mb-3">
                            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${kpi.color} flex items-center justify-center`}>
                                <kpi.icon className="h-5 w-5 text-white" />
                            </div>
                            <span className={`text-xs font-semibold flex items-center gap-0.5 ${kpi.up ? "text-green-500" : "text-red-500"}`}>
                                {kpi.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                {kpi.trend}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
                        <p className="text-2xl font-bold text-foreground font-display">{kpi.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <h2 className="font-semibold text-foreground mb-4">Monthly Revenue</h2>
                    <div className="flex items-end gap-2 h-40">
                        {monthlyRevenue.map(([month, revenue]) => (
                            <div key={month} className="flex-1 flex flex-col items-center gap-1">
                                <span className="text-[10px] text-muted-foreground font-semibold">
                                    {revenue > 0 ? `₹${(revenue / 1000).toFixed(0)}k` : ""}
                                </span>
                                <div
                                    className="w-full rounded-t-md bg-gradient-to-t from-amber-600 to-yellow-400 transition-all duration-500 min-h-[4px]"
                                    style={{ height: `${(revenue / maxRevenue) * 120}px` }}
                                />
                                <span className="text-[9px] text-muted-foreground">{month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Status Breakdown */}
                <div className="rounded-xl border border-border bg-card p-5">
                    <h2 className="font-semibold text-foreground mb-4">Order Status Breakdown</h2>
                    <div className="space-y-3">
                        {[
                            { label: "Pending", count: stats?.pendingOrders || 0, color: "bg-yellow-500" },
                            { label: "Processing", count: stats?.processingOrders || 0, color: "bg-blue-500" },
                            { label: "Shipped", count: stats?.shippedOrders || 0, color: "bg-purple-500" },
                            { label: "Delivered", count: stats?.deliveredOrders || 0, color: "bg-green-500" },
                        ].map((s) => {
                            const total = stats?.totalOrders || 1;
                            const pct = Math.round((s.count / total) * 100);
                            return (
                                <div key={s.label}>
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">{s.label}</span>
                                        <span className="font-semibold text-foreground">{s.count} ({pct}%)</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                                        <div className={`h-full rounded-full ${s.color} transition-all duration-700`} style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Top Products */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="px-5 py-4 border-b border-border">
                    <h2 className="font-semibold text-foreground">Top Products by Revenue</h2>
                </div>
                <div className="divide-y divide-border">
                    {topProducts.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground text-sm">No sales data yet</div>
                    ) : (
                        topProducts.map((p, i) => (
                            <div key={p.name} className="px-5 py-3 flex items-center gap-4">
                                <span className="text-lg font-bold text-muted-foreground w-6 shrink-0">#{i + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                                    <p className="text-xs text-muted-foreground">{p.count} units sold</p>
                                </div>
                                <p className="text-sm font-bold text-foreground shrink-0">₹{p.revenue.toLocaleString("en-IN")}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Products Summary */}
            <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="font-semibold text-foreground mb-4">Catalog Summary</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{products?.length || 0}</p>
                        <p className="text-xs text-muted-foreground">Total Products</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-green-500">{products?.filter(p => p.is_active).length || 0}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-yellow-500">{products?.filter(p => p.stock_quantity > 0 && p.stock_quantity <= 5).length || 0}</p>
                        <p className="text-xs text-muted-foreground">Low Stock</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-bold text-red-500">{products?.filter(p => p.stock_quantity === 0).length || 0}</p>
                        <p className="text-xs text-muted-foreground">Out of Stock</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAnalytics;
