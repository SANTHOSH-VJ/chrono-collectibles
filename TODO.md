# Development TODO List
## Old Coins & Paper Currency E-Commerce Platform

---

## 📋 Project Setup

### Initial Setup
- [ ] Create GitHub repository
- [ ] Initialize Next.js project with TypeScript
  ```bash
  npx create-next-app@latest numismarket --typescript --tailwind --app --use-pnpm
  ```
- [ ] Install dependencies
  ```bash
  pnpm add @supabase/supabase-js @tanstack/react-query zustand react-hook-form @hookform/resolvers zod
  pnpm add -D @types/node @types/react
  ```
- [ ] Install shadcn/ui
  ```bash
  pnpm dlx shadcn-ui@latest init
  ```
- [ ] Configure ESLint and Prettier
- [ ] Set up Git hooks with Husky
- [ ] Create `.env.local` and `.env.example` files

---

## 🗄️ Database Setup (Supabase)

### Supabase Project Creation
- [ ] Create Supabase project at https://supabase.com
- [ ] Save project URL and anon key to `.env.local`
- [ ] Enable Email authentication in Supabase Auth settings

### Database Schema Implementation
- [ ] Create `profiles` table
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
- [ ] Create `categories` table
- [ ] Create `products` table with all fields
- [ ] Create `product_images` table
- [ ] Create `orders` table
- [ ] Create `order_items` table
- [ ] Add database indexes for performance
- [ ] Set up Row-Level Security (RLS) policies

### RLS Policies to Create
- [ ] Profiles: Users can read/update own profile, admins can read all
- [ ] Products: Public can read active products, admins can CRUD all
- [ ] Product Images: Public can read, admins can CRUD
- [ ] Orders: Users can read own orders, admins can read all
- [ ] Order Items: Users can read own order items, admins can read all

### Storage Setup
- [ ] Create `product-images` storage bucket
- [ ] Set up storage policies (public read, admin write)
- [ ] Configure image upload settings

---

## 🎨 UI Components Setup (shadcn/ui)

### Install Required Components
- [ ] Button
  ```bash
  pnpm dlx shadcn-ui@latest add button
  ```
- [ ] Input
- [ ] Card
- [ ] Dialog
- [ ] Dropdown Menu
- [ ] Table
- [ ] Toast
- [ ] Alert
- [ ] Badge
- [ ] Tabs
- [ ] Select
- [ ] Form components
- [ ] Label
- [ ] Textarea
- [ ] Checkbox
- [ ] Radio Group
- [ ] Separator
- [ ] Avatar
- [ ] Skeleton

### Additional UI Libraries
- [ ] Install Lucide icons: `pnpm add lucide-react`
- [ ] Install react-hot-toast: `pnpm add react-hot-toast`
- [ ] Install Swiper for image carousel: `pnpm add swiper`
- [ ] Install date-fns: `pnpm add date-fns`
- [ ] Install clsx and tailwind-merge: `pnpm add clsx tailwind-merge`

---

## 🔐 Authentication Implementation

### Supabase Auth Setup
- [ ] Create `lib/supabase/client.ts` for client-side Supabase
- [ ] Create `lib/supabase/server.ts` for server-side Supabase
- [ ] Create `lib/supabase/middleware.ts` for auth middleware
- [ ] Generate TypeScript types: `pnpm supabase gen types typescript`

### Auth Pages
- [ ] Create `/app/(auth)/login/page.tsx`
  - [ ] Email/password login form
  - [ ] Form validation with Zod
  - [ ] Error handling
  - [ ] Redirect after login
- [ ] Create `/app/(auth)/register/page.tsx`
  - [ ] Registration form
  - [ ] Email verification flow
  - [ ] Auto-create profile after signup
- [ ] Create `/app/(auth)/forgot-password/page.tsx`
- [ ] Create `/app/(auth)/reset-password/page.tsx`

### Auth Components
- [ ] Create `components/auth/AuthProvider.tsx`
- [ ] Create `components/auth/ProtectedRoute.tsx`
- [ ] Create `components/shared/UserMenu.tsx`
- [ ] Create `components/shared/AuthButtons.tsx`

### Auth Hooks
- [ ] Create `hooks/useUser.ts` - Get current user
- [ ] Create `hooks/useAuth.ts` - Auth operations (login, logout, etc.)

---

## 🏪 Public-Facing Features

### Homepage
- [ ] Create `/app/page.tsx`
  - [ ] Hero section with attractive banner
  - [ ] Featured products section
  - [ ] Categories section
  - [ ] Trust badges / testimonials
  - [ ] Newsletter signup (optional)

### Product Listing Page
- [ ] Create `/app/(shop)/products/page.tsx`
  - [ ] Fetch products from Supabase
  - [ ] Product grid layout
  - [ ] Filters sidebar
    - [ ] Category filter
    - [ ] Price range filter
    - [ ] Year filter
    - [ ] Condition filter
    - [ ] Rarity filter
  - [ ] Search functionality
  - [ ] Sort options (price, date, rarity)
  - [ ] Pagination
  - [ ] Loading states
  - [ ] Empty state

### Product Detail Page
- [ ] Create `/app/(shop)/products/[slug]/page.tsx`
  - [ ] Image gallery with zoom (main + thumbnails)
  - [ ] Product information display
  - [ ] Price and stock availability
  - [ ] Add to cart button
  - [ ] Product specifications table
  - [ ] Breadcrumb navigation
  - [ ] Related products section

### Product Components
- [ ] Create `components/products/ProductCard.tsx`
- [ ] Create `components/products/ProductGrid.tsx`
- [ ] Create `components/products/ProductFilters.tsx`
- [ ] Create `components/products/ProductSort.tsx`
- [ ] Create `components/products/ProductSearch.tsx`
- [ ] Create `components/products/ProductImageGallery.tsx`
- [ ] Create `components/products/ProductDetails.tsx`

---

## 🛒 Shopping Cart

### Cart State Management
- [ ] Create `store/cartStore.ts` with Zustand
  - [ ] Add to cart action
  - [ ] Remove from cart action
  - [ ] Update quantity action
  - [ ] Clear cart action
  - [ ] Calculate total action
  - [ ] Persist cart to localStorage

### Cart Page
- [ ] Create `/app/(shop)/cart/page.tsx`
  - [ ] Display cart items
  - [ ] Update quantities
  - [ ] Remove items
  - [ ] Show subtotal
  - [ ] Checkout button
  - [ ] Empty cart state
  - [ ] Continue shopping link

### Cart Components
- [ ] Create `components/cart/CartItem.tsx`
- [ ] Create `components/cart/CartSummary.tsx`
- [ ] Create `components/shared/CartIcon.tsx` (with item count badge)
- [ ] Create `components/cart/CartDrawer.tsx` (optional mini cart)

---

## 💳 Checkout & Orders

### Stripe Setup
- [ ] Create Stripe account
- [ ] Get API keys (test mode initially)
- [ ] Install Stripe SDK: `pnpm add stripe @stripe/stripe-js`
- [ ] Create `lib/stripe.ts`

### Checkout Page
- [ ] Create `/app/(shop)/checkout/page.tsx`
  - [ ] Shipping information form
    - [ ] Full name
    - [ ] Email
    - [ ] Phone number
    - [ ] Address fields (line 1, line 2, city, state, zip, country)
  - [ ] Order summary
  - [ ] Payment section (Stripe Elements)
  - [ ] Form validation
  - [ ] Submit order

### Checkout API Routes
- [ ] Create `/app/api/checkout/route.ts`
  - [ ] Create Stripe payment intent
  - [ ] Validate cart items
  - [ ] Check stock availability
- [ ] Create `/app/api/webhooks/stripe/route.ts`
  - [ ] Handle successful payments
  - [ ] Create order in database
  - [ ] Send confirmation email
  - [ ] Update product stock

### Order Confirmation
- [ ] Create `/app/(shop)/order-confirmation/[orderId]/page.tsx`
  - [ ] Display order details
  - [ ] Show customer information
  - [ ] Order summary
  - [ ] Next steps information

### Customer Order History
- [ ] Create `/app/(shop)/my-orders/page.tsx`
  - [ ] List all user orders
  - [ ] Order status badges
  - [ ] View order details

---

## 👨‍💼 Admin Dashboard

### Admin Layout
- [ ] Create `/app/admin/layout.tsx`
  - [ ] Sidebar navigation
  - [ ] Protected route (admin only)
  - [ ] Admin header

### Admin Dashboard Home
- [ ] Create `/app/admin/page.tsx`
  - [ ] Key metrics cards (total sales, orders, products)
  - [ ] Recent orders table
  - [ ] Low stock alerts
  - [ ] Charts (optional with Recharts)

### Product Management
- [ ] Create `/app/admin/products/page.tsx`
  - [ ] Products table with actions (edit, delete, toggle active)
  - [ ] Search and filters
  - [ ] Add new product button
  - [ ] Bulk actions (optional)
  
- [ ] Create `/app/admin/products/new/page.tsx`
  - [ ] Product form
    - [ ] Name, slug (auto-generate from name)
    - [ ] Category dropdown
    - [ ] Description (rich text editor optional)
    - [ ] Price
    - [ ] Stock quantity
    - [ ] Condition dropdown
    - [ ] Year
    - [ ] Country
    - [ ] Rarity level
    - [ ] Certification details
    - [ ] Image upload (multiple)
  - [ ] Form validation
  - [ ] Image preview
  - [ ] Submit handler

- [ ] Create `/app/admin/products/[id]/edit/page.tsx`
  - [ ] Pre-fill form with existing data
  - [ ] Same fields as new product
  - [ ] Update handler
  - [ ] Delete confirmation

### Order Management
- [ ] Create `/app/admin/orders/page.tsx`
  - [ ] Orders table
  - [ ] Status filters (pending, processing, shipped, delivered)
  - [ ] Date filters
  - [ ] Search by order ID or customer name
  - [ ] View order details button

- [ ] Create `/app/admin/orders/[id]/page.tsx`
  - [ ] Customer shipping details
    - [ ] Name, email, phone
    - [ ] Full address
  - [ ] Order items list
  - [ ] Payment details
  - [ ] Order status update
  - [ ] Add tracking number
  - [ ] Print shipping label (optional)
  - [ ] Order timeline

### Admin Components
- [ ] Create `components/admin/Sidebar.tsx`
- [ ] Create `components/admin/StatsCard.tsx`
- [ ] Create `components/admin/ProductForm.tsx`
- [ ] Create `components/admin/ImageUpload.tsx`
- [ ] Create `components/admin/OrdersTable.tsx`
- [ ] Create `components/admin/OrderStatusBadge.tsx`

### Admin API Routes
- [ ] Create `/app/api/admin/products/route.ts` (CRUD)
- [ ] Create `/app/api/admin/orders/route.ts` (Read, Update status)
- [ ] Create `/app/api/admin/upload/route.ts` (Image upload to Supabase)

---

## 🖼️ Image Management

### Image Upload
- [ ] Create image upload component with drag & drop
- [ ] Implement image compression before upload
- [ ] Upload to Supabase Storage
- [ ] Store URLs in `product_images` table
- [ ] Handle multiple images per product
- [ ] Delete images when product is deleted

### Image Optimization
- [ ] Use Next.js `<Image>` component everywhere
- [ ] Configure image domains in `next.config.js`
- [ ] Implement lazy loading
- [ ] Add image placeholders (blur data URLs)

---

## 🔍 Search & Filters

### Search Functionality
- [ ] Implement client-side search (simple)
- [ ] OR implement full-text search with PostgreSQL (advanced)
- [ ] Create search bar component
- [ ] Debounce search input
- [ ] Show search results count

### Filter Logic
- [ ] Create filter state management
- [ ] Combine multiple filters (AND logic)
- [ ] Update URL params with filters
- [ ] Reset filters button
- [ ] Show active filters as badges

---

## 📧 Email Notifications

### Email Setup
- [ ] Choose email service (Resend, SendGrid, or Supabase Edge Function)
- [ ] Create email templates
  - [ ] Order confirmation
  - [ ] Shipping notification
  - [ ] Password reset
  - [ ] Welcome email

### Email Implementation
- [ ] Create email sending utility
- [ ] Trigger emails on order creation
- [ ] Trigger emails on order status update

---

## 🧪 Testing

### Setup Testing Framework
- [ ] Install Vitest: `pnpm add -D vitest @testing-library/react @testing-library/jest-dom`
- [ ] Install Playwright: `pnpm add -D @playwright/test`
- [ ] Configure `vitest.config.ts`
- [ ] Configure `playwright.config.ts`

### Unit Tests
- [ ] Test utility functions
- [ ] Test Zustand store
- [ ] Test custom hooks
- [ ] Test form validation schemas

### Integration Tests
- [ ] Test authentication flow
- [ ] Test cart operations
- [ ] Test checkout process

### E2E Tests
- [ ] Test complete user journey (browse → cart → checkout)
- [ ] Test admin product creation
- [ ] Test admin order management

---

## 🎨 UI/UX Polish

### Design Refinements
- [ ] Choose color scheme (gold/bronze + dark neutrals recommended)
- [ ] Add custom fonts (e.g., from Google Fonts)
- [ ] Create consistent spacing system
- [ ] Add micro-interactions (hover effects, transitions)
- [ ] Implement loading skeletons
- [ ] Add toast notifications for actions

### Responsive Design
- [ ] Test on mobile (375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1280px, 1920px)
- [ ] Ensure touch targets are 44x44px minimum
- [ ] Test hamburger menu on mobile

### Accessibility
- [ ] Add proper alt text to images
- [ ] Ensure keyboard navigation works
- [ ] Test with screen reader
- [ ] Add ARIA labels where needed
- [ ] Ensure color contrast meets WCAG AA standards
- [ ] Add focus indicators

---

## 🚀 Performance Optimization

### Code Optimization
- [ ] Implement code splitting for admin routes
- [ ] Lazy load heavy components
- [ ] Remove unused dependencies
- [ ] Optimize bundle size (analyze with `@next/bundle-analyzer`)

### Database Optimization
- [ ] Add database indexes
- [ ] Optimize queries (select only needed fields)
- [ ] Implement pagination for large lists
- [ ] Use database views for complex queries (optional)

### Image Optimization
- [ ] Compress all images
- [ ] Use WebP format with fallback
- [ ] Implement progressive image loading
- [ ] Add image CDN (Vercel automatically does this)

### Caching
- [ ] Implement TanStack Query caching
- [ ] Set appropriate cache headers
- [ ] Use ISR (Incremental Static Regeneration) for product pages

---

## 🔒 Security Hardening

### Security Checklist
- [ ] Implement rate limiting on API routes
- [ ] Validate all user inputs
- [ ] Sanitize user-generated content
- [ ] Use HTTPS only (automatic on Vercel)
- [ ] Implement CSRF protection
- [ ] Set secure headers in `next.config.js`
- [ ] Review and test RLS policies
- [ ] Implement proper error handling (don't expose sensitive info)
- [ ] Add reCAPTCHA to forms (optional)

### Stripe Security
- [ ] Verify webhook signatures
- [ ] Never log sensitive payment data
- [ ] Use Stripe's test mode for development
- [ ] Implement idempotency keys for payments

---

## 📊 Monitoring & Analytics

### Setup Monitoring
- [ ] Create Sentry account and install SDK
  ```bash
  pnpm add @sentry/nextjs
  pnpm dlx @sentry/wizard@latest -i nextjs
  ```
- [ ] Configure error tracking
- [ ] Set up performance monitoring

### Analytics
- [ ] Install Vercel Analytics (built-in)
- [ ] Set up Google Analytics (optional)
- [ ] Track key events (add to cart, purchase, etc.)

### Application Monitoring
- [ ] Monitor Supabase dashboard regularly
- [ ] Set up alerts for high error rates
- [ ] Monitor API response times

---

## 📝 Documentation

### Code Documentation
- [ ] Add JSDoc comments to functions
- [ ] Document complex logic
- [ ] Create README.md with setup instructions
- [ ] Document environment variables

### User Documentation
- [ ] Create admin user guide
- [ ] Create customer FAQ page
- [ ] Write deployment guide

---

## 🚢 Deployment

### Pre-Deployment Checklist
- [ ] Run all tests and ensure they pass
- [ ] Check for console errors/warnings
- [ ] Test in production mode locally
- [ ] Verify all environment variables are set
- [ ] Test payment flow with Stripe test mode
- [ ] Backup database

### Deploy to Vercel
- [ ] Connect GitHub repo to Vercel
- [ ] Configure environment variables in Vercel
- [ ] Set up custom domain (optional)
- [ ] Configure Vercel redirects and rewrites
- [ ] Deploy to production

### Post-Deployment
- [ ] Test production site thoroughly
- [ ] Set up monitoring and alerts
- [ ] Monitor error rates
- [ ] Test payment flow in production (with Stripe test mode)
- [ ] Switch Stripe to live mode when ready

### Database Migration
- [ ] Create database migration for production
- [ ] Seed initial data (categories, admin user)

---

## 🔄 Post-Launch Tasks

### Optimization
- [ ] Monitor Core Web Vitals
- [ ] Optimize slow queries
- [ ] Review and optimize bundle size
- [ ] Implement caching strategies

### Feature Enhancements
- [ ] Add product reviews/ratings
- [ ] Add wishlist functionality
- [ ] Implement advanced search
- [ ] Add product comparison
- [ ] Add newsletter subscription
- [ ] Add social sharing

### Marketing
- [ ] Set up SEO meta tags
- [ ] Create sitemap.xml
- [ ] Submit to Google Search Console
- [ ] Implement structured data (schema.org)
- [ ] Set up social media meta tags (Open Graph, Twitter Cards)

---

## 📋 Summary Checklist

### Phase 1: Foundation ✅
- [ ] Project setup
- [ ] Database schema
- [ ] Authentication
- [ ] Basic UI components

### Phase 2: Core Features ✅
- [ ] Product browsing
- [ ] Product detail pages
- [ ] Shopping cart
- [ ] Admin product management

### Phase 3: E-Commerce ✅
- [ ] Checkout process
- [ ] Payment integration
- [ ] Order management
- [ ] Email notifications

### Phase 4: Polish ✅
- [ ] UI/UX refinements
- [ ] Testing
- [ ] Performance optimization
- [ ] Security hardening

### Phase 5: Launch ✅
- [ ] Deployment
- [ ] Monitoring
- [ ] Documentation
- [ ] Post-launch optimization

---

**Estimated Timeline:** 6-8 weeks for MVP  
**Team Size:** 1-2 developers  
**Last Updated:** February 10, 2026
