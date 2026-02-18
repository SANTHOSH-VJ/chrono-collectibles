import { useState } from "react";
import { useProducts, useCategories, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, Trash2, X, Search, ToggleLeft, ToggleRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

type Condition = "Poor" | "Fair" | "Fine" | "Good" | "Very Good" | "Excellent" | "Uncirculated";
type Rarity = "Common" | "Uncommon" | "Rare" | "Very Rare" | "Extremely Rare";

interface ProductForm {
    name: string;
    slug: string;
    category_id: number | null;
    description: string;
    price: string;
    stock_quantity: string;
    condition: Condition | "";
    year: string;
    country: string;
    rarity_level: Rarity | "";
    certification_details: string;
    is_active: boolean;
    image_url: string;
}

const emptyForm: ProductForm = {
    name: "",
    slug: "",
    category_id: null,
    description: "",
    price: "",
    stock_quantity: "",
    condition: "",
    year: "",
    country: "",
    rarity_level: "",
    certification_details: "",
    is_active: true,
    image_url: "",
};

const CONDITIONS: Condition[] = ["Poor", "Fair", "Fine", "Good", "Very Good", "Excellent", "Uncirculated"];
const RARITIES: Rarity[] = ["Common", "Uncommon", "Rare", "Very Rare", "Extremely Rare"];

const AdminProducts = () => {
    const { data: products, isLoading } = useProducts();
    const { data: categories } = useCategories();
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState<ProductForm>(emptyForm);
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    const filtered = (products || []).filter(
        (p) =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.country?.toLowerCase().includes(search.toLowerCase())
    );

    const openCreate = () => {
        setForm(emptyForm);
        setEditId(null);
        setShowModal(true);
    };

    const openEdit = (p: any) => {
        setForm({
            name: p.name,
            slug: p.slug,
            category_id: p.category_id,
            description: p.description || "",
            price: String(p.price),
            stock_quantity: String(p.stock_quantity),
            condition: p.condition || "",
            year: p.year ? String(p.year) : "",
            country: p.country || "",
            rarity_level: p.rarity_level || "",
            certification_details: p.certification_details || "",
            is_active: p.is_active,
            image_url: p.images?.[0] || "",
        });
        setEditId(p.id);
        setShowModal(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Auto-generate slug from name
        if (name === "name") {
            setForm((prev) => ({
                ...prev,
                name: value,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                name: form.name,
                slug: form.slug,
                category_id: form.category_id,
                description: form.description || null,
                price: parseFloat(form.price),
                stock_quantity: parseInt(form.stock_quantity) || 0,
                condition: (form.condition as Condition) || null,
                year: form.year ? parseInt(form.year) : null,
                country: form.country || null,
                rarity_level: (form.rarity_level as Rarity) || null,
                certification_details: form.certification_details || null,
                is_active: form.is_active,
            };

            if (editId) {
                await updateProduct.mutateAsync({ id: editId, ...payload });
                // Handle image
                if (form.image_url) {
                    await supabase.from("product_images").upsert({
                        product_id: editId,
                        image_url: form.image_url,
                        display_order: 0,
                    });
                }
            } else {
                const newProduct = await createProduct.mutateAsync(payload);
                if (form.image_url && newProduct?.id) {
                    await supabase.from("product_images").insert({
                        product_id: newProduct.id,
                        image_url: form.image_url,
                        display_order: 0,
                    });
                }
            }
            setShowModal(false);
        } catch {
            // error handled by hooks
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct.mutateAsync(id);
            setDeleteConfirm(null);
        } catch {
            toast.error("Failed to delete product");
        }
    };

    const toggleActive = async (p: any) => {
        try {
            await updateProduct.mutateAsync({ id: p.id, is_active: !p.is_active });
        } catch { }
    };

    const rarityColor: Record<string, string> = {
        Common: "bg-gray-500/10 text-gray-400",
        Uncommon: "bg-green-500/10 text-green-500",
        Rare: "bg-blue-500/10 text-blue-400",
        "Very Rare": "bg-purple-500/10 text-purple-400",
        "Extremely Rare": "bg-red-500/10 text-red-400",
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-display text-foreground">Products</h1>
                    <p className="text-sm text-muted-foreground mt-1">{products?.length || 0} total products</p>
                </div>
                <Button onClick={openCreate} className="bg-gradient-gold text-primary-foreground font-semibold gap-2 shadow-gold hover:opacity-90">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            {/* Search */}
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search products..."
                    className="pl-9 bg-card border-border"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Product</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Price</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Stock</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Rarity</th>
                                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
                                <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-muted-foreground">Loading products...</td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-12 text-muted-foreground">No products found</td>
                                </tr>
                            ) : (
                                filtered.map((p) => (
                                    <tr key={p.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium text-foreground">{p.name}</p>
                                                <p className="text-xs text-muted-foreground">{p.country} {p.year ? `· ${p.year}` : ""}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground capitalize">{(p as any).category?.name || "—"}</td>
                                        <td className="px-4 py-3 font-semibold text-foreground">₹{Number(p.price).toLocaleString("en-IN")}</td>
                                        <td className="px-4 py-3">
                                            <span className={`font-semibold ${p.stock_quantity === 0 ? "text-red-500" : p.stock_quantity <= 5 ? "text-yellow-500" : "text-green-500"}`}>
                                                {p.stock_quantity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {p.rarity_level ? (
                                                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${rarityColor[p.rarity_level] || "bg-secondary text-muted-foreground"}`}>
                                                    {p.rarity_level}
                                                </span>
                                            ) : "—"}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button onClick={() => toggleActive(p)} className="flex items-center gap-1.5 text-xs">
                                                {p.is_active ? (
                                                    <><ToggleRight className="h-5 w-5 text-green-500" /><span className="text-green-500">Active</span></>
                                                ) : (
                                                    <><ToggleLeft className="h-5 w-5 text-muted-foreground" /><span className="text-muted-foreground">Inactive</span></>
                                                )}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center justify-end gap-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => openEdit(p)}>
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setDeleteConfirm(p.id)}>
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
                        <h3 className="text-lg font-bold text-foreground mb-2">Delete Product?</h3>
                        <p className="text-sm text-muted-foreground mb-6">This action cannot be undone. The product will be permanently removed.</p>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
                            <Button className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => handleDelete(deleteConfirm)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Product Form Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
                            <h2 className="text-lg font-bold font-display text-foreground">
                                {editId ? "Edit Product" : "Add New Product"}
                            </h2>
                            <Button variant="ghost" size="icon" onClick={() => setShowModal(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <Label className="text-xs text-muted-foreground">Product Name *</Label>
                                    <Input name="name" value={form.name} onChange={handleChange} required className="mt-1 bg-secondary border-border" placeholder="e.g. 1947 British India One Rupee" />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Slug (URL)</Label>
                                    <Input name="slug" value={form.slug} onChange={handleChange} className="mt-1 bg-secondary border-border font-mono text-xs" placeholder="auto-generated" />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Category</Label>
                                    <select name="category_id" value={form.category_id || ""} onChange={(e) => setForm(f => ({ ...f, category_id: e.target.value ? parseInt(e.target.value) : null }))}
                                        className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                                        <option value="">Select category</option>
                                        {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Price (₹) *</Label>
                                    <Input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required className="mt-1 bg-secondary border-border" placeholder="0.00" />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Stock Quantity</Label>
                                    <Input name="stock_quantity" type="number" min="0" value={form.stock_quantity} onChange={handleChange} className="mt-1 bg-secondary border-border" placeholder="0" />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Condition</Label>
                                    <select name="condition" value={form.condition} onChange={handleChange}
                                        className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                                        <option value="">Select condition</option>
                                        {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Rarity Level</Label>
                                    <select name="rarity_level" value={form.rarity_level} onChange={handleChange}
                                        className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
                                        <option value="">Select rarity</option>
                                        {RARITIES.map((r) => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Year</Label>
                                    <Input name="year" type="number" min="1" value={form.year} onChange={handleChange} className="mt-1 bg-secondary border-border" placeholder="e.g. 1947" />
                                </div>
                                <div>
                                    <Label className="text-xs text-muted-foreground">Country</Label>
                                    <Input name="country" value={form.country} onChange={handleChange} className="mt-1 bg-secondary border-border" placeholder="e.g. India" />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-xs text-muted-foreground">Image URL</Label>
                                    <Input name="image_url" value={form.image_url} onChange={handleChange} className="mt-1 bg-secondary border-border" placeholder="https://..." />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-xs text-muted-foreground">Description</Label>
                                    <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                                        className="mt-1 w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                                        placeholder="Describe the product..." />
                                </div>
                                <div className="sm:col-span-2">
                                    <Label className="text-xs text-muted-foreground">Certification Details</Label>
                                    <Input name="certification_details" value={form.certification_details} onChange={handleChange} className="mt-1 bg-secondary border-border" placeholder="e.g. NGC MS-65" />
                                </div>
                                <div className="sm:col-span-2 flex items-center gap-3">
                                    <input type="checkbox" id="is_active" checked={form.is_active} onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
                                        className="h-4 w-4 rounded border-border accent-primary" />
                                    <Label htmlFor="is_active" className="text-sm text-foreground cursor-pointer">Active (visible to customers)</Label>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button type="submit" disabled={saving} className="flex-1 bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:opacity-90">
                                    {saving ? "Saving..." : editId ? "Update Product" : "Create Product"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProducts;
