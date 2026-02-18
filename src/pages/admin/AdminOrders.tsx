import { useState } from "react";
import { useAllOrders, useUpdateOrderStatus } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, Package } from "lucide-react";

const STATUS_OPTIONS = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusColor: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    shipped: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    delivered: "bg-green-500/10 text-green-500 border-green-500/20",
    cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
};

const paymentColor: Record<string, string> = {
    pending: "text-yellow-500",
    completed: "text-green-500",
    failed: "text-red-500",
    refunded: "text-blue-500",
};

const AdminOrders = () => {
    const { data: orders, isLoading } = useAllOrders();
    const updateStatus = useUpdateOrderStatus();

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newStatus, setNewStatus] = useState("");
    const [trackingInput, setTrackingInput] = useState("");

    const filtered = (orders || []).filter((o) => {
        const matchSearch =
            o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
            o.customer_email.toLowerCase().includes(search.toLowerCase()) ||
            String(o.id).includes(search);
        const matchStatus = filterStatus === "all" || o.order_status === filterStatus;
        return matchSearch && matchStatus;
    });

    const handleUpdateStatus = async (orderId: number) => {
        await updateStatus.mutateAsync({
            id: orderId,
            order_status: newStatus || undefined,
            tracking_number: trackingInput || undefined,
        });
        setEditingId(null);
    };

    const startEdit = (order: any) => {
        setEditingId(order.id);
        setNewStatus(order.order_status);
        setTrackingInput(order.tracking_number || "");
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold font-display text-foreground">Orders</h1>
                <p className="text-sm text-muted-foreground mt-1">{orders?.length || 0} total orders</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or order ID..."
                        className="pl-9 bg-card border-border"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {["all", ...STATUS_OPTIONS].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterStatus === s
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-3">
                {isLoading ? (
                    <div className="rounded-xl border border-border bg-card p-12 text-center text-muted-foreground">
                        Loading orders...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-xl border border-border bg-card p-12 text-center">
                        <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground">No orders found</p>
                    </div>
                ) : (
                    filtered.map((order) => {
                        const isExpanded = expandedId === order.id;
                        const isEditing = editingId === order.id;

                        return (
                            <div key={order.id} className="rounded-xl border border-border bg-card overflow-hidden">
                                {/* Order Row */}
                                <div
                                    className="px-5 py-4 flex items-center gap-4 cursor-pointer hover:bg-secondary/30 transition-colors"
                                    onClick={() => setExpandedId(isExpanded ? null : order.id)}
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <span className="text-sm font-bold text-foreground">#{order.id}</span>
                                            <span className="text-sm text-foreground">{order.customer_name}</span>
                                            <span className="text-xs text-muted-foreground">{order.customer_email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(order.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric", month: "short", year: "numeric",
                                                })}
                                            </span>
                                            <span className={`text-xs font-semibold ${paymentColor[order.payment_status]}`}>
                                                Payment: {order.payment_status}
                                            </span>
                                            {order.tracking_number && (
                                                <span className="text-xs text-muted-foreground">
                                                    Track: {order.tracking_number}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border uppercase tracking-wide ${statusColor[order.order_status]}`}>
                                            {order.order_status}
                                        </span>
                                        <span className="text-sm font-bold text-foreground">
                                            ₹{Number(order.total_amount).toLocaleString("en-IN")}
                                        </span>
                                        {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="border-t border-border px-5 py-4 space-y-4 bg-secondary/20">
                                        {/* Shipping Address */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Shipping Address</p>
                                                <p className="text-sm text-foreground">{order.shipping_address_line1}</p>
                                                {order.shipping_address_line2 && <p className="text-sm text-foreground">{order.shipping_address_line2}</p>}
                                                <p className="text-sm text-foreground">{order.shipping_city}, {order.shipping_state} {order.shipping_zip}</p>
                                                <p className="text-sm text-foreground">{order.shipping_country}</p>
                                                <p className="text-sm text-muted-foreground mt-1">{order.customer_phone}</p>
                                            </div>

                                            {/* Update Status */}
                                            <div>
                                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Update Order</p>
                                                {isEditing ? (
                                                    <div className="space-y-2">
                                                        <select
                                                            value={newStatus}
                                                            onChange={(e) => setNewStatus(e.target.value)}
                                                            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                                                        >
                                                            {STATUS_OPTIONS.map((s) => (
                                                                <option key={s} value={s} className="capitalize">{s}</option>
                                                            ))}
                                                        </select>
                                                        <Input
                                                            placeholder="Tracking number (optional)"
                                                            value={trackingInput}
                                                            onChange={(e) => setTrackingInput(e.target.value)}
                                                            className="bg-card border-border text-sm"
                                                        />
                                                        <div className="flex gap-2">
                                                            <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingId(null)}>Cancel</Button>
                                                            <Button size="sm" className="flex-1 bg-gradient-gold text-primary-foreground font-semibold hover:opacity-90"
                                                                onClick={() => handleUpdateStatus(order.id)} disabled={updateStatus.isPending}>
                                                                {updateStatus.isPending ? "Saving..." : "Save"}
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Button variant="outline" size="sm" onClick={() => startEdit(order)}>
                                                        Edit Status / Tracking
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Order Items */}
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Items Ordered</p>
                                            <div className="space-y-2">
                                                {(order as any).order_items?.map((item: any) => (
                                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                                        <span className="text-foreground">{item.product_name}</span>
                                                        <div className="flex items-center gap-4 text-muted-foreground">
                                                            <span>×{item.quantity}</span>
                                                            <span className="font-semibold text-foreground">₹{Number(item.price * item.quantity).toLocaleString("en-IN")}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
