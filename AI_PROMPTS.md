# AI Agent Prompts for Development
## Old Coins & Paper Currency E-Commerce Platform

---

## 🎨 PROMPT 1: Frontend Template (Lovable / v0)

### For Lovable.dev or v0.dev

```
Create a modern, professional e-commerce website template for selling collectible old coins and paper currency with the following requirements:

## Design Style
- Professional and trustworthy aesthetic suitable for high-value collectibles
- Color scheme: Dark navy/charcoal backgrounds with gold/bronze accents
- Clean, minimalist layout emphasizing product imagery
- Elegant serif font for headings (like Playfair Display or Cormorant), sans-serif for body (Inter or Outfit)
- High-end luxury feel similar to auction houses or fine jewelry stores

## Pages Needed

### 1. Homepage
- Hero section with large background image of rare coins/currency
- Headline: "Discover History's Finest Collectibles"
- Search bar prominently placed
- Featured products grid (6 items)
- Categories section with image cards (Old Coins | Paper Currency)
- Trust badges (Authenticity Guaranteed, Secure Payments, Expert Curation)
- Newsletter signup section

### 2. Product Listing Page
- Left sidebar with filters:
  * Category (Coins/Currency)
  * Price range slider
  * Year range
  * Condition (dropdown)
  * Country (multi-select)
  * Rarity level
- Product grid (3-4 columns on desktop, 1-2 on mobile)
- Each product card shows:
  * High-quality product image
  * Name and year
  * Condition badge
  * Price
  * "View Details" button
  * Rarity indicator (stars or label)
- Top bar with search, sort dropdown, and results count
- Pagination at bottom

### 3. Product Detail Page
- Large image gallery (main image + 4 thumbnails below)
- Zoom on hover functionality
- Right panel with:
  * Product name and year
  * Price (large, prominent)
  * Condition badge
  * Stock status
  * Add to cart button (large, gold/bronze)
  * Quantity selector
- Tabs below for:
  * Description
  * Specifications (table format: Year, Country, Denomination, Rarity, etc.)
  * Authenticity & Certification
- Related products section

### 4. Shopping Cart Page
- Cart items list with:
  * Thumbnail image
  * Product name and details
  * Quantity adjuster
  * Price
  * Remove button
- Cart summary sidebar:
  * Subtotal
  * Estimated shipping
  * Total (large, bold)
  * Proceed to Checkout button
- Continue Shopping link
- Empty cart state with image

### 5. Checkout Page
- Progress indicator (Cart > Shipping > Payment > Confirmation)
- Two-column layout:
  * Left: Shipping information form
    - Full name
    - Email
    - Phone number
    - Address (street, apartment, city, state, ZIP, country)
  * Right: Order summary (sticky)
    - Items list
    - Subtotal
    - Shipping
    - Total
- Payment section placeholder (Stripe will be integrated later)
- Place Order button

### 6. Login/Register Pages
- Center-aligned forms with:
  * Logo at top
  * Form fields with elegant styling
  * Social login buttons (Google)
  * Toggle between Login/Register
- Background: Subtle coin/currency pattern

### 7. Admin Dashboard (Basic Layout)
- Sidebar navigation:
  * Dashboard
  * Products
  * Orders
  * Customers (future)
  * Settings
- Main content area with placeholder for different sections
- Top header with user menu and notifications

## UI Components Needed
- Navigation bar (sticky, with cart icon showing item count)
- Footer (links, contact info, social icons)
- Product cards
- Filter components
- Buttons (primary, secondary, ghost)
- Input fields with validation states
- Dropdown selects
- Badge components
- Modal/Dialog
- Toast notifications placeholder
- Loading skeletons
- Pagination component

## Technical Requirements
- Fully responsive (mobile-first)
- Use Tailwind CSS for styling
- Use shadcn/ui components where possible
- Include Lucide React icons
- Smooth transitions and hover effects
- Accessibility: proper ARIA labels, keyboard navigation
- Dark mode toggle (optional)

## Interactive Elements
- Image gallery with zoom
- Add to cart animation
- Filter sidebar toggle on mobile
- Sticky navigation on scroll
- Smooth scrolling
- Form validation visual feedback

## Example Product Data (use for mockup)
Product 1:
- Name: "1909-S VDB Lincoln Penny"
- Year: 1909
- Price: $1,450
- Condition: Very Good
- Rarity: Extremely Rare
- Country: United States

Product 2:
- Name: "1896 $5 Silver Certificate"
- Year: 1896
- Price: $2,800
- Condition: Fine
- Rarity: Very Rare
- Country: United States

Create a visually stunning, production-ready frontend that looks like a premium e-commerce site. Focus on clean code, beautiful design, and smooth user experience.
```

---

## 🔧 PROMPT 2: Full-Stack Application (Bolt.new / Cursor / v0)

### For Bolt.new, Cursor AI, or similar full-stack AI agents

```
Build a complete, production-ready e-commerce web application for selling collectible old coins and paper currency with full admin capabilities.

## Core Requirements

### Technology Stack
- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Supabase (PostgreSQL database, Authentication, Storage)
- **Payment:** Stripe integration
- **Deployment:** Vercel-ready
- **State Management:** Zustand for cart, TanStack Query for server state

### Database Schema (Supabase PostgreSQL)

Create these tables:

1. **profiles** (extends auth.users)
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

2. **categories**
```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. **products**
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  condition TEXT CHECK (condition IN ('Poor', 'Fair', 'Good', 'Very Good', 'Excellent', 'Uncirculated')),
  year INTEGER,
  country TEXT,
  rarity_level TEXT CHECK (rarity_level IN ('Common', 'Uncommon', 'Rare', 'Very Rare', 'Extremely Rare')),
  certification_details TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

4. **product_images**
```sql
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. **orders**
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address_line1 TEXT NOT NULL,
  shipping_address_line2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip TEXT NOT NULL,
  shipping_country TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  tracking_number TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

6. **order_items**
```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Row-Level Security (RLS) Policies

Implement these security rules:

**Products:**
- Public can SELECT where is_active = true
- Admin can SELECT, INSERT, UPDATE, DELETE all

**Orders:**
- Users can SELECT their own orders (user_id = auth.uid())
- Admin can SELECT all orders
- Anyone authenticated can INSERT orders

**Order Items:**
- Users can SELECT items from their orders
- Admin can SELECT all

### Authentication Features

1. **User Registration**
   - Email/password signup
   - Auto-create profile in profiles table
   - Email verification optional

2. **User Login**
   - Email/password authentication
   - Session management
   - Protected routes middleware

3. **Role-Based Access**
   - Customer role: Can browse, purchase, view own orders
   - Admin role: Full CRUD on products, view all orders
   - Create admin check hook: `useIsAdmin()`

### Customer-Facing Features

1. **Homepage**
   - Hero section with search
   - Featured products (fetch 6 random products)
   - Categories section
   - Responsive grid layout

2. **Product Browsing**
   - `/products` page with grid
   - Filters: category, price range, year, condition, country, rarity
   - Search by name/description
   - Sort by: price (asc/desc), date added, name
   - Pagination (20 items per page)

3. **Product Detail**
   - `/products/[slug]` dynamic route
   - Image gallery with zoom
   - All product details displayed
   - Add to cart functionality
   - Stock validation

4. **Shopping Cart**
   - Zustand store for cart state
   - Persist to localStorage
   - `/cart` page showing items
   - Update quantity, remove items
   - Calculate totals
   - Cart icon in header with badge count

5. **Checkout**
   - `/checkout` page
   - Shipping information form with validation (React Hook Form + Zod)
   - Stripe payment integration
   - Create order on successful payment
   - Redirect to order confirmation

6. **Order Confirmation**
   - `/orders/[orderId]` page
   - Display order details
   - Thank you message

7. **Order History**
   - `/my-orders` page (protected)
   - List user's orders
   - View order details
   - Order status badges

### Admin Features

1. **Admin Dashboard**
   - `/admin` protected route (check role = 'admin')
   - Stats cards: Total products, Total orders, Revenue
   - Recent orders table

2. **Product Management**
   - `/admin/products` - List all products
   - Search, filter, sort
   - Toggle product active status
   - Edit and delete buttons

   - `/admin/products/new` - Add new product form
   - All fields from schema
   - Multiple image upload to Supabase Storage
   - Form validation
   - Auto-generate slug from name

   - `/admin/products/[id]/edit` - Edit product
   - Pre-fill form with existing data
   - Update images

3. **Order Management**
   - `/admin/orders` - List all orders
   - Filter by status, date
   - Search by customer name or order ID

   - `/admin/orders/[id]` - Order details
   - View customer shipping information
   - Order items list
   - Update order status dropdown
   - Add tracking number field

### API Routes (Next.js Route Handlers)

1. `/api/checkout` - POST
   - Create Stripe payment intent
   - Validate cart items and stock
   - Return client secret

2. `/api/webhooks/stripe` - POST
   - Handle Stripe webhook events
   - On payment success: create order, reduce stock
   - Send confirmation email (optional)

3. `/api/admin/products` - GET, POST
   - CRUD operations (with admin auth check)

4. `/api/admin/upload` - POST
   - Upload images to Supabase Storage
   - Return public URLs

### Stripe Integration

1. Install: `@stripe/stripe-js` and `stripe`
2. Create `lib/stripe.ts` with Stripe instance
3. Use Stripe Elements for payment form
4. Implement webhook handling with signature verification
5. Test mode keys for development

### Supabase Setup

1. Initialize Supabase client (`lib/supabase/client.ts`)
2. Server-side client for API routes (`lib/supabase/server.ts`)
3. Configure Storage bucket: `product-images`
4. Set storage policy: public read, admin write

### State Management

1. **Cart Store (Zustand)**
```typescript
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
```

### Image Handling

1. Use Next.js `<Image>` component everywhere
2. Upload images to Supabase Storage
3. Store URLs in `product_images` table
4. Compress images on upload
5. Lazy load product images

### UI/UX Requirements

1. **Design:**
   - Professional, luxury aesthetic
   - Dark theme with gold accents
   - Use shadcn/ui components
   - Responsive (mobile-first)

2. **Components to create:**
   - Navbar with cart icon
   - Footer
   - ProductCard
   - ProductGrid
   - FilterSidebar
   - ImageGallery
   - CartItem
   - OrderStatusBadge
   - LoadingSkeleton
   - EmptyState

3. **Interactions:**
   - Toast notifications (react-hot-toast)
   - Loading states
   - Form validation feedback
   - Smooth transitions

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Key Features Checklist

✅ User authentication (email/password)
✅ Product browsing with filters and search
✅ Shopping cart with persistence
✅ Stripe checkout integration
✅ Order creation and management
✅ Admin product CRUD with image upload
✅ Admin order management with customer details
✅ Responsive design
✅ Protected routes (customer and admin)
✅ Form validation
✅ Error handling
✅ Loading states

### Seed Data

Create initial seed data:
- 2 categories: "Old Coins", "Paper Currency"
- 10-15 sample products with images
- 1 admin user (email: admin@example.com, password: admin123)

### File Structure

```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (shop)/
│   ├── products/
│   │   └── [slug]/
│   ├── cart/
│   ├── checkout/
│   └── my-orders/
├── admin/
│   ├── products/
│   │   ├── new/
│   │   └── [id]/edit/
│   └── orders/
│       └── [id]/
├── api/
│   ├── checkout/
│   ├── webhooks/stripe/
│   └── admin/
├── layout.tsx
└── page.tsx
components/
lib/
├── supabase/
├── stripe.ts
└── utils.ts
store/
├── cartStore.ts
types/
```

### Testing Requirements

1. Test user registration and login
2. Test product filtering and search
3. Test cart operations
4. Test checkout flow (use Stripe test cards)
5. Test admin product creation
6. Test admin order management

### Deployment

- Configure for Vercel deployment
- Set all environment variables
- Test in production mode locally first
- Deploy to Vercel
- Connect custom domain (optional)

Build this as a complete, production-ready application with clean code, proper error handling, and beautiful UI. The app should feel professional and ready to launch.
```

---

## 🎯 Quick Start Commands

### For both prompts, prepare this information:

**Supabase Setup:**
1. Create account at https://supabase.com
2. Create new project
3. Get project URL and anon key
4. Create tables using SQL editor

**Stripe Setup:**
1. Create account at https://stripe.com
2. Get test mode API keys
3. Configure webhook endpoint

---

## 📝 Notes for AI Agents

### When using Lovable (frontend only):
- Focus on UI/UX and component structure
- Mock data for products and orders
- Create reusable component library
- Emphasize responsive design

### When using Bolt/V0 (full-stack):
- Implement complete functionality
- Set up database and authentication
- Integrate payment processing
- Include admin features
- Deploy-ready code

---

**Last Updated:** February 10, 2026
