import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Database } from '@/lib/database.types';
import { toast } from 'sonner';

type Order = Database['public']['Tables']['orders']['Row'];
type OrderInsert = Database['public']['Tables']['orders']['Insert'];
type OrderUpdate = Database['public']['Tables']['orders']['Update'];
type OrderItem = Database['public']['Tables']['order_items']['Row'];
type OrderItemInsert = Database['public']['Tables']['order_items']['Insert'];

interface OrderWithItems extends Order {
    order_items: OrderItem[];
}

interface CreateOrderData {
    order: OrderInsert;
    items: Omit<OrderItemInsert, 'order_id'>[];
}

// Fetch user's orders
export const useUserOrders = (userId?: string) => {
    return useQuery({
        queryKey: ['orders', 'user', userId],
        queryFn: async () => {
            if (!userId) return [];

            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items(*)
        `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as OrderWithItems[];
        },
        enabled: !!userId,
    });
};

// Fetch all orders (admin only)
export const useAllOrders = () => {
    return useQuery({
        queryKey: ['orders', 'all'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items(*)
        `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data as OrderWithItems[];
        },
    });
};

// Fetch single order
export const useOrder = (orderId: number) => {
    return useQuery({
        queryKey: ['order', orderId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select(`
          *,
          order_items(*)
        `)
                .eq('id', orderId)
                .single();

            if (error) throw error;
            return data as OrderWithItems;
        },
        enabled: !!orderId,
    });
};

// Create order
export const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ order, items }: CreateOrderData) => {
            // Create order
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert(order)
                .select()
                .single();

            if (orderError) throw orderError;

            // Create order items
            const orderItems = items.map(item => ({
                ...item,
                order_id: orderData.id,
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // Update product stock
            for (const item of items) {
                if (item.product_id) {
                    const { data: product } = await supabase
                        .from('products')
                        .select('stock_quantity')
                        .eq('id', item.product_id)
                        .single();

                    if (product) {
                        await supabase
                            .from('products')
                            .update({ stock_quantity: product.stock_quantity - item.quantity })
                            .eq('id', item.product_id);
                    }
                }
            }

            return orderData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Order created successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to create order');
        },
    });
};

// Update order status (admin only)
export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            order_status,
            tracking_number
        }: {
            id: number;
            order_status?: string;
            tracking_number?: string;
        }) => {
            const updateData: any = {};
            if (order_status) updateData.order_status = order_status;
            if (tracking_number !== undefined) updateData.tracking_number = tracking_number;

            const { data, error } = await supabase
                .from('orders')
                .update(updateData)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            toast.success('Order updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.message || 'Failed to update order');
        },
    });
};

// Get order statistics (admin only)
export const useOrderStats = () => {
    return useQuery({
        queryKey: ['orders', 'stats'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('orders')
                .select('total_amount, order_status, payment_status');

            if (error) throw error;

            const stats = {
                totalOrders: data.length,
                totalRevenue: data
                    .filter(o => o.payment_status === 'completed')
                    .reduce((sum, o) => sum + Number(o.total_amount), 0),
                pendingOrders: data.filter(o => o.order_status === 'pending').length,
                processingOrders: data.filter(o => o.order_status === 'processing').length,
                shippedOrders: data.filter(o => o.order_status === 'shipped').length,
                deliveredOrders: data.filter(o => o.order_status === 'delivered').length,
            };

            return stats;
        },
    });
};
