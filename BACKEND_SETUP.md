# Backend Setup Guide

## 🚀 Quick Start

### 1. Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Click "New Project"
4. Fill in:
   - **Project Name**: chrono-collectibles
   - **Database Password**: (create a strong password and save it)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free

### 2. Get Your Credentials

Once your project is created:

1. Go to **Project Settings** (gear icon) → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### 3. Update Environment Variables

Open `.env.local` and replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-actual-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key-here
```

### 4. Create Database Schema

1. In Supabase Dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL Editor
5. Click **Run** (or press Ctrl+Enter)
6. Wait for "Success. No rows returned" message

### 5. Seed Initial Data

1. In SQL Editor, create another **New Query**
2. Copy the entire contents of `supabase/seed.sql`
3. Paste and **Run**
4. Verify: You should see 12 products created

### 6. Create Storage Bucket

1. Go to **Storage** in Supabase Dashboard
2. Click **New Bucket**
3. Name: `product-images`
4. **Public bucket**: ✅ Enable
5. Click **Create Bucket**

### 7. Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Fill in:
   - **Email**: admin@chronocollectibles.com
   - **Password**: (create a strong password)
   - **Auto Confirm User**: ✅ Enable
4. Click **Create User**
5. Copy the **User ID** (UUID)
6. Go back to **SQL Editor** and run:

```sql
UPDATE profiles 
SET role = 'admin' 
WHERE id = 'paste-user-id-here';
```

### 8. Test the Connection

Restart your dev server:

```bash
npm run dev
```

The app should now connect to Supabase! 🎉

## 📝 What Was Created

### Files Created:

```
chrono-collectibles/
├── .env.local                          # Your credentials (DO NOT COMMIT)
├── .env.example                        # Template for others
├── supabase/
│   ├── schema.sql                      # Database structure
│   └── seed.sql                        # Initial data
├── src/
│   ├── lib/
│   │   ├── supabase.ts                 # Supabase client
│   │   └── database.types.ts           # TypeScript types
│   ├── contexts/
│   │   └── AuthContext.tsx             # Authentication state
│   ├── hooks/
│   │   ├── useProducts.ts              # Product queries
│   │   └── useOrders.ts                # Order queries
│   └── components/
│       └── ProtectedRoute.tsx          # Route protection
```

### Database Tables Created:

1. **profiles** - User information and roles
2. **categories** - Product categories (Coins, Currency)
3. **products** - All product data
4. **product_images** - Product image URLs
5. **orders** - Customer orders
6. **order_items** - Items in each order

### Features Enabled:

✅ User authentication (sign up, sign in, sign out)
✅ Role-based access (customer vs admin)
✅ Product management (CRUD with React Query)
✅ Order management
✅ Row-level security (RLS)
✅ Automatic profile creation on signup
✅ Image storage bucket

## 🔐 Security

- **Row-Level Security (RLS)** is enabled on all tables
- Customers can only see their own orders
- Admins can manage everything
- Public can view active products
- All data is validated at the database level

## 🧪 Testing

### Test Customer Flow:

1. Go to `/login`
2. Create a new account
3. Browse products at `/products`
4. Add items to cart
5. Proceed to checkout

### Test Admin Flow:

1. Sign in with admin@chronocollectibles.com
2. You should have admin privileges
3. Can manage products and orders (admin pages coming next)

## 📊 Database Schema Diagram

```
auth.users (Supabase Auth)
    ↓
profiles (role: customer/admin)
    ↓
orders → order_items → products
              ↓
         product_images
              ↓
         categories
```

## 🚨 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists and has correct values
- Restart dev server after updating `.env.local`

### "Failed to fetch products"
- Check if schema.sql ran successfully
- Check if seed.sql ran successfully
- Verify RLS policies are created

### "Access denied" errors
- Check if user profile was created
- For admin: verify role is set to 'admin' in profiles table

### Products not showing
- Run seed.sql to insert sample products
- Check `is_active = true` on products
- Verify RLS policies allow public read access

## 📚 Next Steps

Now that backend is initialized:

1. ✅ **Update existing pages** to use Supabase data instead of mock data
2. ✅ **Build admin dashboard** for product/order management
3. ✅ **Add Stripe payment** integration
4. ✅ **Deploy to production**

## 🆘 Need Help?

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- Check the SQL Editor for error messages
- Review RLS policies if access issues occur
