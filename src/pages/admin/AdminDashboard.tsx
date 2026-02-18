import { useAllOrders, useOrderStats } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import {
    TrendingUp,
    ShoppingBag,
    Package,
    AlertTriangle,
    Clock,
    CheckCircle,
    Truck,
    DollarSign,
} from "lucide-react";

const StatCard = ({
    label,
    value,
    icon: Icon,
    color,
    sub,
}: {
    label: string;
    value: string | number;
    icon: React.ElementType;
    color: string;
    sub?: string;
}) => (
    <div className="rounded-xl border border-border bg-card p-5 flex items-start gap-4">
        <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
            <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
            <p className="text-xs text-muted-foreground mb-1">{label}</p>
            <p className="text-2xl font-bold text-foreground font-display">{value}</p>
            {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
        </div>
    </div>
);

const AdminDashboard = () => {
    const { data: stats, isLoading: statsLoading } = useOrderStats();
    const { data: orders, isLoading: ordersLoading } = useAllOrders();
    const { data: products, isLoading: productsLoading } = useProducts();

    const lowStockProducts = products?.filter((p) => p.stock_quantity <= 5) || [];
    const recentOrders = orders?.slice(0, 5) || [];

    const statusColor: Record<string, string> = {
        pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        shipped: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        delivered: "bg-green-500/10 text-green-500 border-green-500/20",
        cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold font-display text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard
                    label="Total Revenue"
                    value={statsLoading ? "..." : `₹${(stats?.totalRevenue || 0).toLocaleString("en-IN")}`}
                    icon={DollarSign}
                    color="bg-gradient-to-br from-amber-500 to-yellow-600"
                    sub="From completed orders"
                />
                <StatCard
                    label="Total Orders"
                    value={statsLoading ? "..." : stats?.totalOrders || 0}
                    icon={ShoppingBag}
                    color="bg-gradient-to-br from-blue-500 to-blue-700"
                    sub={`${stats?.pendingOrders || 0} pending`}
                />
                <StatCard
                    label="Total Products"
                    value={productsLoading ? "..." : products?.length || 0}
                    icon={Package}
                    color="bg-gradient-to-br from-emerald-500 to-green-700"
                    sub={`${lowStockProducts.length} low stock`}
                />
                <StatCard
                    label="Shipped Orders"
                    value={statsLoading ? "..." : stats?.shippedOrders || 0}
                    icon={Truck}
                    color="bg-gradient-to-br from-purple-500 to-purple-700"
                    sub={`${stats?.deliveredOrders || 0} delivered`}
                />
            </div>

            {/* Order Status Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: "Pending", count: stats?.pendingOrders, icon: Clock, cls: "text-yellow-500" },
                    { label: "Processing", count: stats?.processingOrders, icon: TrendingUp, cls: "text-blue-500" },
                    { label: "Shipped", count: stats?.shippedOrders, icon: Truck, cls: "text-purple-500" },
                    { label: "Delivered", count: stats?.deliveredOrders, icon: CheckCircle, cls: "text-green-500" },
                ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-border bg-card px-4 py-3 flex items-center gap-3">
                        <s.icon className={`h-4 w-4 ${s.cls}`} />
                        <div>
                            <p className="text-xs text-muted-foreground">{s.label}</p>
                            <p className="text-lg font-bold text-foreground">{statsLoading ? "..." : s.count || 0}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                        <h2 className="font-semibold text-foreground">Recent Orders</h2>
                        <span className="text-xs text-muted-foreground">{orders?.length || 0} total</span>
                    </div>
                    <div className="divide-y divide-border">
                        {ordersLoading ? (
                            <div className="p-8 text-center text-muted-foreground text-sm">Loading orders...</div>
                        ) : recentOrders.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground text-sm">No orders yet</div>
                        ) : (
                            recentOrders.map((order) => (
                                <div key={order.id} className="px-5 py-3 flex items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            #{order.id} · {order.customer_name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(order.created_at).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <span
                                        className={`text-[10px] font-semibold px-2 py-1 rounded-full border uppercase tracking-wide ${statusColor[order.order_status] || "bg-secondary text-muted-foreground"
                                            }`}
                                    >
                                        {order.order_status}
                                    </span>
                                    <p className="text-sm font-bold text-foreground shrink-0">
                                        ₹{Number(order.total_amount).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Low Stock Alert */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <h2 className="font-semibold text-foreground">Low Stock Alert</h2>
                    </div>
                    <div className="divide-y divide-border">
                        {productsLoading ? (
                            <div className="p-6 text-center text-muted-foreground text-sm">Loading...</div>
                        ) : lowStockProducts.length === 0 ? (
                            <div className="p-6 text-center text-muted-foreground text-sm">
                                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                All products well stocked
                            </div>
                        ) : (
                            lowStockProducts.slice(0, 6).map((p) => (
                                <div key={p.id} className="px-5 py-3 flex items-center justify-between gap-2">
                                    <p className="text-sm text-foreground truncate flex-1">{p.name}</p>
                                    <span
                                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.stock_quantity === 0
                                                ? "bg-red-500/10 text-red-500"
                                                : "bg-yellow-500/10 text-yellow-500"
                                            }`}
                                    >
                                        {p.stock_quantity === 0 ? "Out" : `${p.stock_quantity} left`}
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
