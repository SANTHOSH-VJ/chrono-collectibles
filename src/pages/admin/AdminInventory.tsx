import { useProducts } from "@/hooks/useProducts";
import { useUpdateProduct } from "@/hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, AlertTriangle, CheckCircle, Package } from "lucide-react";
import { toast } from "sonner";

const AdminInventory = () => {
    const { data: products, isLoading } = useProducts();
    const updateProduct = useUpdateProduct();

    const [search, setSearch] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [newQty, setNewQty] = useState("");
    const [filterMode, setFilterMode] = useState<"all" | "low" | "out">("all");

    const filtered = (products || []).filter((p) => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.country?.toLowerCase().includes(search.toLowerCase());
        if (filterMode === "low") return matchSearch && p.stock_quantity > 0 && p.stock_quantity <= 5;
        if (filterMode === "out") return matchSearch && p.stock_quantity === 0;
        return matchSearch;
    });

    const outOfStock = products?.filter((p) => p.stock_quantity === 0).length || 0;
    const lowStock = products?.filter((p) => p.stock_quantity > 0 && p.stock_quantity <= 5).length || 0;
    const totalValue = products?.reduce((sum, p) => sum + p.price * p.stock_quantity, 0) || 0;

    const handleUpdateQty = async (id: number) => {
        const qty = parseInt(newQty);
        if (isNaN(qty) || qty < 0) {
            toast.error("Please enter a valid quantity");
            return;
        }
        try {
            await updateProduct.mutateAsync({ id, stock_quantity: qty });
            setEditingId(null);
        } catch { }
    };

    const stockStatus = (qty: number) => {
        if (qty === 0) return { label: "Out of Stock", cls: "bg-red-500/10 text-red-500 border-red-500/20" };
        if (qty <= 5) return { label: "Low Stock", cls: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" };
        return { label: "In Stock", cls: "bg-green-500/10 text-green-500 border-green-500/20" };
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold font-display text-foreground">Inventory</h1>
                <p className="text-sm text-muted-foreground mt-1">Manage stock levels for all products</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Out of Stock</p>
                        <p className="text-2xl font-bold text-red-500">{outOfStock}</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Low Stock (≤5)</p>
                        <p className="text-2xl font-bold text-yellow-500">{lowStock}</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Inventory Value</p>
                        <p className="text-2xl font-bold text-foreground">₹{totalValue.toLocaleString("en-IN")}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-9 bg-card border-border"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    {(["all", "low", "out"] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => setFilterMode(m)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all border ${filterMode === m
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                }`}
                        >
                            {m === "all" ? "All" : m === "low" ? "Low Stock" : "Out of Stock"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Inventory Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Product</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Price</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock Value</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">Loading inventory...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">No products found</td></tr>
                            ) : (
                                filtered.map((p) => {
                                    const status = stockStatus(p.stock_quantity);
                                    const isEditing = editingId === p.id;
                                    return (
                                        <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                                            <td className="px-4 py-3">
                                                <p className="font-medium text-foreground">{p.name}</p>
                                                <p className="text-xs text-muted-foreground">{p.country} {p.year ? `· ${p.year}` : ""}</p>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground capitalize">{(p as any).category?.name || "—"}</td>
                                            <td className="px-4 py-3 font-semibold text-foreground">₹{Number(p.price).toLocaleString("en-IN")}</td>
                                            <td className="px-4 py-3">
                                                {isEditing ? (
                                                    <Input
                                                        type="number"
                                                        min="0"
                                                        value={newQty}
                                                        onChange={(e) => setNewQty(e.target.value)}
                                                        className="w-20 h-8 bg-secondary border-border text-sm"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span className={`text-lg font-bold ${p.stock_quantity === 0 ? "text-red-500" : p.stock_quantity <= 5 ? "text-yellow-500" : "text-foreground"}`}>
                                                        {p.stock_quantity}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${status.cls}`}>
                                                    {status.label}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-muted-foreground">
                                                ₹{(p.price * p.stock_quantity).toLocaleString("en-IN")}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-end gap-1">
                                                    {isEditing ? (
                                                        <>
                                                            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditingId(null)}>Cancel</Button>
                                                            <Button size="sm" className="h-7 text-xs bg-gradient-gold text-primary-foreground hover:opacity-90"
                                                                onClick={() => handleUpdateQty(p.id)} disabled={updateProduct.isPending}>
                                                                Save
                                                            </Button>
                                                        </>
                                                    ) : (
                                                        <Button size="sm" variant="outline" className="h-7 text-xs"
                                                            onClick={() => { setEditingId(p.id); setNewQty(String(p.stock_quantity)); }}>
                                                            Edit Stock
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminInventory;
