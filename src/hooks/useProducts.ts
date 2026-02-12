import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { toast } from 'sonner';

type Product = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];
type ProductUpdate = Database['public']['Tables']['products']['Update'];

interface ProductWithImages extends Product {
    images: string[];
    category?: {
        name: string;
        slug: string;
    };
}

interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
    rarity?: string;
    country?: string;
    search?: string;
}

// Fetch all products with filters
export const useProducts = (filters?: ProductFilters) => {
    return useQuery({
        queryKey: ['products', filters],
        queryFn: async () => {
            let query = supabase
                .from('products')
                .select(`
          *,
          category:categories(name, slug),
          product_images(image_url, display_order)
        `)
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            // Apply filters
            if (filters?.category) {
                const { data: category } = await supabase
                    .from('categories')
                    .select('id')
                    .eq('slug', filters.category)
                    .single();

                if (category) {
                    query = query.eq('category_id', category.id);
                }
            }

            if (filters?.minPrice) {
                query = query.gte('price', filters.minPrice);
            }

            if (filters?.maxPrice) {
                query = query.lte('price', filters.maxPrice);
            }

            if (filters?.condition) {
                query = query.eq('condition', filters.condition);
            }

            if (filters?.rarity) {
                query = query.eq('rarity_level', filters.rarity);
            }

            if (filters?.country) {
                query = query.eq('country', filters.country);
            }

            if (filters?.search) {
                query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Transform data to include images array
            const products: ProductWithImages[] = (data || []).map((product: any) => ({
                ...product,
                images: product.product_images
                    ?.sort((a: any, b: any) => a.display_order - b.display_order)
                    .map((img: any) => img.image_url) || [],
                category: product.category,
            }));

            return products;
        },
    });
};

// Fetch single product by slug
export const useProduct = (slug: string) => {
    return useQuery({
        queryKey: ['product', slug],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('products')
                .select(`
          *,
          category:categories(name, slug),
          product_images(image_url, display_order)
        `)
                .eq('slug', slug)
                .eq('is_active', true)
                .single();

            if (error) throw error;

            const product: ProductWithImages = {
                ...data,
                images: data.product_images
                    ?.sort((a: any, b: any) => a.display_order - b.display_order)
                    .map((img: any) => img.image_url) || [],
                category: data.category,
            };

            return product;
        },
        enabled: !!slug,
    });
};

// Create product (admin only)
export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (product: ProductInsert) => {
            const { data, error } = await supabase
                .from('products')
                .insert(product)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product created successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create product');
        },
    });
};

// Update product (admin only)
export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...product }: ProductUpdate & { id: number }) => {
            const { data, error } = await supabase
                .from('products')
                .update(product)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update product');
        },
    });
};

// Delete product (admin only)
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to delete product');
        },
    });
};

// Fetch categories
export const useCategories = () => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            if (error) throw error;
            return data;
        },
    });
};
