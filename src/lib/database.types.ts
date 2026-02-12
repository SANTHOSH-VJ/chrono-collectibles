export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    phone: string | null
                    role: 'customer' | 'admin'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    phone?: string | null
                    role?: 'customer' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    phone?: string | null
                    role?: 'customer' | 'admin'
                    created_at?: string
                    updated_at?: string
                }
            }
            categories: {
                Row: {
                    id: number
                    name: string
                    slug: string
                    description: string | null
                    created_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    slug: string
                    description?: string | null
                    created_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    slug?: string
                    description?: string | null
                    created_at?: string
                }
            }
            products: {
                Row: {
                    id: number
                    name: string
                    slug: string
                    category_id: number | null
                    description: string | null
                    price: number
                    stock_quantity: number
                    condition: 'Poor' | 'Fair' | 'Fine' | 'Good' | 'Very Good' | 'Excellent' | 'Uncirculated' | null
                    year: number | null
                    country: string | null
                    rarity_level: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Extremely Rare' | null
                    certification_details: string | null
                    is_active: boolean
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    name: string
                    slug: string
                    category_id?: number | null
                    description?: string | null
                    price: number
                    stock_quantity?: number
                    condition?: 'Poor' | 'Fair' | 'Fine' | 'Good' | 'Very Good' | 'Excellent' | 'Uncirculated' | null
                    year?: number | null
                    country?: string | null
                    rarity_level?: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Extremely Rare' | null
                    certification_details?: string | null
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    name?: string
                    slug?: string
                    category_id?: number | null
                    description?: string | null
                    price?: number
                    stock_quantity?: number
                    condition?: 'Poor' | 'Fair' | 'Fine' | 'Good' | 'Very Good' | 'Excellent' | 'Uncirculated' | null
                    year?: number | null
                    country?: string | null
                    rarity_level?: 'Common' | 'Uncommon' | 'Rare' | 'Very Rare' | 'Extremely Rare' | null
                    certification_details?: string | null
                    is_active?: boolean
                    created_at?: string
                    updated_at?: string
                }
            }
            product_images: {
                Row: {
                    id: number
                    product_id: number
                    image_url: string
                    display_order: number
                    created_at: string
                }
                Insert: {
                    id?: number
                    product_id: number
                    image_url: string
                    display_order?: number
                    created_at?: string
                }
                Update: {
                    id?: number
                    product_id?: number
                    image_url?: string
                    display_order?: number
                    created_at?: string
                }
            }
            orders: {
                Row: {
                    id: number
                    user_id: string | null
                    customer_name: string
                    customer_email: string
                    customer_phone: string
                    shipping_address_line1: string
                    shipping_address_line2: string | null
                    shipping_city: string
                    shipping_state: string
                    shipping_zip: string
                    shipping_country: string
                    total_amount: number
                    payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
                    order_status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    payment_id: string | null
                    tracking_number: string | null
                    notes: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: number
                    user_id?: string | null
                    customer_name: string
                    customer_email: string
                    customer_phone: string
                    shipping_address_line1: string
                    shipping_address_line2?: string | null
                    shipping_city: string
                    shipping_state: string
                    shipping_zip: string
                    shipping_country: string
                    total_amount: number
                    payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
                    order_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    payment_id?: string | null
                    tracking_number?: string | null
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: number
                    user_id?: string | null
                    customer_name?: string
                    customer_email?: string
                    customer_phone?: string
                    shipping_address_line1?: string
                    shipping_address_line2?: string | null
                    shipping_city?: string
                    shipping_state?: string
                    shipping_zip?: string
                    shipping_country?: string
                    total_amount?: number
                    payment_status?: 'pending' | 'completed' | 'failed' | 'refunded'
                    order_status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
                    payment_id?: string | null
                    tracking_number?: string | null
                    notes?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            order_items: {
                Row: {
                    id: number
                    order_id: number
                    product_id: number | null
                    product_name: string
                    quantity: number
                    price: number
                    created_at: string
                }
                Insert: {
                    id?: number
                    order_id: number
                    product_id?: number | null
                    product_name: string
                    quantity: number
                    price: number
                    created_at?: string
                }
                Update: {
                    id?: number
                    order_id?: number
                    product_id?: number | null
                    product_name?: string
                    quantity?: number
                    price?: number
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
