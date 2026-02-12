# Product Requirements Document (PRD)
## Old Coins & Paper Currency E-Commerce Platform

---

## 1. Executive Summary

**Product Name:** NumisMarket (Numismatic Marketplace)  
**Version:** 1.0  
**Target Launch:** Production-ready full-stack application  
**Platform Type:** Web-based E-commerce Application

**Core Purpose:**  
A professional e-commerce platform for buying and selling collectible old coins and paper currency, with streamlined admin management and customer order processing.

---

## 2. Product Vision & Goals

### 2.1 Vision Statement
Create a secure, scalable, and user-friendly marketplace that connects collectors with rare coins and paper currency while providing admins with efficient product and order management capabilities.

### 2.2 Primary Goals
- Enable seamless browsing and purchasing of collectible currency
- Provide robust admin controls for inventory management
- Implement secure authentication and authorization
- Store customer order data efficiently in Supabase
- Ensure production-ready quality and performance

---

## 3. User Personas

### 3.1 Customer (Buyer)
- **Profile:** Coin/currency collectors, history enthusiasts, investors
- **Goals:** Browse authentic items, secure checkout, track orders
- **Pain Points:** Need verification of authenticity, clear product details, secure transactions

### 3.2 Admin (Seller)
- **Profile:** Store owner/manager
- **Goals:** Manage inventory, process orders, view customer details for shipping
- **Pain Points:** Need efficient product uploads, order management, customer information access

---

## 4. Functional Requirements

### 4.1 Authentication & Authorization

#### 4.1.1 User Authentication
- **FR-AUTH-001:** Users can register with email and password
- **FR-AUTH-002:** Users can log in securely
- **FR-AUTH-003:** Password reset functionality via email
- **FR-AUTH-004:** Session management with secure tokens
- **FR-AUTH-005:** Social authentication (Google OAuth - optional)

#### 4.1.2 Role-Based Authorization
- **FR-AUTH-006:** Two user roles: Customer and Admin
- **FR-AUTH-007:** Admin-only access to product management dashboard
- **FR-AUTH-008:** Admin-only access to order management and customer details
- **FR-AUTH-009:** Customers can only view their own orders

### 4.2 Product Management (Admin)

#### 4.2.1 Product CRUD Operations
- **FR-PROD-001:** Admin can add new products with:
  - Product name
  - Category (Old Coins / Paper Currency)
  - Sub-category (Era, Country, Denomination)
  - Description (detailed)
  - Price
  - Stock quantity
  - Multiple images (up to 5)
  - Condition grade (Poor, Fair, Good, Very Good, Excellent, Uncirculated)
  - Year of minting/printing
  - Rarity level
  - Certification details (if applicable)

- **FR-PROD-002:** Admin can edit existing products
- **FR-PROD-003:** Admin can delete products (soft delete recommended)
- **FR-PROD-004:** Admin can enable/disable product visibility
- **FR-PROD-005:** Admin can manage product inventory levels
- **FR-PROD-006:** Bulk upload capability via CSV (future enhancement)

#### 4.2.2 Product Images
- **FR-PROD-007:** Image upload to Supabase Storage
- **FR-PROD-008:** Image optimization and compression
- **FR-PROD-009:** Multiple image views (front, back, close-ups)

### 4.3 Customer Features

#### 4.3.1 Product Browsing
- **FR-CUST-001:** Browse all available products
- **FR-CUST-002:** Filter by category (Coins/Currency)
- **FR-CUST-003:** Filter by price range
- **FR-CUST-004:** Filter by era/year
- **FR-CUST-005:** Filter by country/region
- **FR-CUST-006:** Search functionality (by name, description, year)
- **FR-CUST-007:** Sort options (price, date added, rarity, popularity)

#### 4.3.2 Product Details
- **FR-CUST-008:** Detailed product page with:
  - High-resolution images with zoom
  - Complete specifications
  - Price and availability
  - Authenticity information
  - Seller notes

#### 4.3.3 Shopping Cart
- **FR-CUST-009:** Add items to cart
- **FR-CUST-010:** Update quantities in cart
- **FR-CUST-011:** Remove items from cart
- **FR-CUST-012:** Cart persistence (logged-in users)
- **FR-CUST-013:** Cart total calculation

#### 4.3.4 Checkout Process
- **FR-CUST-014:** Customer provides shipping information:
  - Full name
  - Phone number
  - Complete shipping address (Street, City, State, ZIP, Country)
  - Email address

- **FR-CUST-015:** Order review before submission
- **FR-CUST-016:** Payment integration (Stripe/Razorpay)
- **FR-CUST-017:** Order confirmation page
- **FR-CUST-018:** Order confirmation email

#### 4.3.5 Order Management (Customer View)
- **FR-CUST-019:** View order history
- **FR-CUST-020:** View order status
- **FR-CUST-021:** Track shipment (future enhancement)

### 4.4 Order Management (Admin)

#### 4.4.1 Order Processing
- **FR-ORDER-001:** Admin dashboard showing all orders
- **FR-ORDER-002:** Order filtering by status (Pending, Processing, Shipped, Delivered, Cancelled)
- **FR-ORDER-003:** Order filtering by date range
- **FR-ORDER-004:** Order search by customer name, order ID, or product

#### 4.4.2 Customer Details Access
- **FR-ORDER-005:** Admin can view complete customer details for each order:
  - Customer name
  - Phone number
  - Full shipping address
  - Email
  - Order items and quantities
  - Total amount
  - Payment status

- **FR-ORDER-006:** Customer details stored in Supabase database in structured format
- **FR-ORDER-007:** Export order details to CSV/PDF for shipping labels
- **FR-ORDER-008:** Update order status
- **FR-ORDER-009:** Add tracking information to orders

### 4.5 Data Storage (Supabase)

#### 4.5.1 Database Schema
- **FR-DATA-001:** Users table (authentication data)
- **FR-DATA-002:** Products table
- **FR-DATA-003:** Orders table
- **FR-DATA-004:** Order_items table (order line items)
- **FR-DATA-005:** Categories table
- **FR-DATA-006:** Product_images table

#### 4.5.2 Supabase Storage
- **FR-DATA-007:** Product images stored in Supabase Storage buckets
- **FR-DATA-008:** Organized folder structure by product ID

---

## 5. Non-Functional Requirements

### 5.1 Performance
- **NFR-PERF-001:** Page load time < 2 seconds
- **NFR-PERF-002:** Image optimization for fast loading
- **NFR-PERF-003:** Efficient database queries with indexing
- **NFR-PERF-004:** Lazy loading for product images

### 5.2 Scalability
- **NFR-SCALE-001:** Support 1,000+ products
- **NFR-SCALE-002:** Handle 100+ concurrent users
- **NFR-SCALE-003:** Database designed for horizontal scaling
- **NFR-SCALE-004:** CDN integration for static assets

### 5.3 Security
- **NFR-SEC-001:** HTTPS encryption for all communications
- **NFR-SEC-002:** Secure password hashing (bcrypt)
- **NFR-SEC-003:** SQL injection prevention
- **NFR-SEC-004:** XSS protection
- **NFR-SEC-005:** CSRF protection
- **NFR-SEC-006:** Row-level security in Supabase
- **NFR-SEC-007:** Rate limiting on API endpoints

### 5.4 Usability
- **NFR-USE-001:** Responsive design (mobile, tablet, desktop)
- **NFR-USE-002:** Intuitive navigation
- **NFR-USE-003:** Accessibility compliance (WCAG 2.1 Level AA)
- **NFR-USE-004:** Professional and attractive UI/UX

### 5.5 Reliability
- **NFR-REL-001:** 99.5% uptime
- **NFR-REL-002:** Automated database backups
- **NFR-REL-003:** Error logging and monitoring
- **NFR-REL-004:** Graceful error handling

### 5.6 Maintainability
- **NFR-MAIN-001:** Clean, documented code
- **NFR-MAIN-002:** Modular architecture
- **NFR-MAIN-003:** Version control (Git)
- **NFR-MAIN-004:** Automated testing (unit, integration)

---

## 6. User Interface Requirements

### 6.1 Design Principles
- Professional and trustworthy aesthetic
- Clean, minimalist layout
- High-quality product photography emphasis
- Easy-to-read typography
- Consistent color scheme (suggest: gold/bronze accents with dark neutrals)

### 6.2 Key Pages/Views

#### 6.2.1 Public Pages
- Homepage (featured products, categories)
- Product listing page (grid view with filters)
- Product detail page
- Shopping cart
- Checkout page
- Login/Register pages
- About/Contact pages

#### 6.2.2 Customer Dashboard
- Order history
- Profile settings
- Saved addresses

#### 6.2.3 Admin Dashboard
- Analytics overview (sales, revenue, orders)
- Product management (list, add, edit)
- Order management (list, view details, update status)
- Customer order details view

---

## 7. Technical Specifications

### 7.1 Recommended Tech Stack

#### Frontend
- **Framework:** React 18+ with Vite or Next.js 14+
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Zustand or React Context API
- **Form Handling:** React Hook Form + Zod validation
- **HTTP Client:** Axios or Supabase JS client
- **Routing:** React Router (Vite) or Next.js App Router
- **Image Optimization:** Next.js Image or react-image-lazy-load

#### Backend
- **BaaS:** Supabase (PostgreSQL database + Authentication + Storage)
- **API Layer:** Supabase Auto-generated REST/GraphQL APIs
- **Edge Functions:** Supabase Edge Functions (for complex logic)

#### Payment
- **Gateway:** Stripe or Razorpay
- **Integration:** Official SDK

#### Deployment
- **Frontend:** Vercel or Netlify
- **Backend:** Supabase Cloud
- **CDN:** Cloudflare or built-in (Vercel/Netlify)

#### Development Tools
- **Version Control:** Git + GitHub
- **Package Manager:** pnpm or npm
- **Code Quality:** ESLint + Prettier
- **Testing:** Vitest + React Testing Library
- **CI/CD:** GitHub Actions

### 7.2 Database Schema (Supabase PostgreSQL)

```sql
-- Users (handled by Supabase Auth)
-- auth.users table is auto-created

-- User Profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products
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

-- Product Images
CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders
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
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  order_status TEXT DEFAULT 'pending' CHECK (order_status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_id TEXT,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(order_status);
CREATE INDEX idx_order_items_order ON order_items(order_id);
```

---

## 8. API Endpoints (Supabase Auto-generated + Custom)

### 8.1 Authentication (Supabase Auth)
- POST `/auth/signup` - User registration
- POST `/auth/login` - User login
- POST `/auth/logout` - User logout
- POST `/auth/reset-password` - Password reset

### 8.2 Products
- GET `/rest/v1/products` - List all active products
- GET `/rest/v1/products?id=eq.{id}` - Get single product
- POST `/rest/v1/products` - Create product (admin)
- PATCH `/rest/v1/products?id=eq.{id}` - Update product (admin)
- DELETE `/rest/v1/products?id=eq.{id}` - Delete product (admin)

### 8.3 Orders
- GET `/rest/v1/orders` - List user orders (customer) or all orders (admin)
- POST `/rest/v1/orders` - Create new order
- PATCH `/rest/v1/orders?id=eq.{id}` - Update order status (admin)

### 8.4 Categories
- GET `/rest/v1/categories` - List all categories

---

## 9. Scalability Plan

### 9.1 Phase 1: MVP (0-100 users, 0-500 products)
**Infrastructure:**
- Supabase free tier (500MB database, 1GB storage)
- Vercel hobby plan
- Single region deployment

**Optimization:**
- Basic caching (browser cache)
- Image compression
- Lazy loading

### 9.2 Phase 2: Growth (100-1,000 users, 500-2,000 products)
**Infrastructure:**
- Supabase Pro tier ($25/month - 8GB database, 100GB storage)
- Vercel Pro plan
- CDN integration (Cloudflare)

**Optimization:**
- Database connection pooling
- API response caching (Redis)
- Database indexing optimization
- Image CDN

**Monitoring:**
- Supabase dashboard metrics
- Vercel Analytics
- Error tracking (Sentry)

### 9.3 Phase 3: Scale (1,000-10,000 users, 2,000-10,000 products)
**Infrastructure:**
- Supabase Team tier or higher
- Vercel Enterprise
- Multi-region CDN

**Optimization:**
- Database read replicas
- Full-text search (Supabase/PostgreSQL)
- Advanced caching strategies
- Background job processing (Supabase Edge Functions)
- Rate limiting
- Database query optimization

**Monitoring:**
- Comprehensive logging
- Performance monitoring (Datadog/New Relic)
- Real-time alerts

### 9.4 Scaling Strategies

#### Database Scaling
- Vertical scaling (upgrade Supabase plan)
- Connection pooling (PgBouncer - included in Supabase)
- Read replicas for reporting queries
- Database partitioning for large tables
- Archive old orders to separate tables

#### Application Scaling
- Horizontal scaling (automatic with Vercel/Netlify)
- Stateless application design
- CDN for static assets
- API rate limiting per user

#### Storage Scaling
- Supabase Storage auto-scales
- Image optimization pipeline
- Lazy loading and progressive images

#### Performance Optimization
- Code splitting
- Tree shaking
- Server-side rendering (Next.js)
- Edge functions for compute-heavy tasks

---

## 10. Development Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Supabase project
- [ ] Design database schema
- [ ] Implement authentication
- [ ] Set up frontend project structure
- [ ] Create basic UI components

### Phase 2: Core Features (Weeks 3-4)
- [ ] Product management (admin)
- [ ] Product browsing (customer)
- [ ] Shopping cart functionality
- [ ] Product image upload

### Phase 3: E-commerce (Weeks 5-6)
- [ ] Checkout process
- [ ] Payment integration
- [ ] Order management (admin)
- [ ] Email notifications

### Phase 4: Polish & Testing (Week 7)
- [ ] UI/UX refinement
- [ ] Responsive design
- [ ] Testing (unit, integration, E2E)
- [ ] Performance optimization

### Phase 5: Deployment (Week 8)
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Documentation
- [ ] User acceptance testing

---

## 11. Success Metrics

### 11.1 Technical Metrics
- Page load time < 2 seconds
- API response time < 200ms
- 99.5% uptime
- Zero critical security vulnerabilities

### 11.2 Business Metrics
- Conversion rate (visitors to buyers)
- Average order value
- Cart abandonment rate
- Customer satisfaction score

### 11.3 User Metrics
- Active users (daily/monthly)
- Session duration
- Bounce rate
- Return visitor rate

---

## 12. Risk Assessment & Mitigation

### 12.1 Technical Risks
**Risk:** Database performance degradation with large product catalog  
**Mitigation:** Implement pagination, indexing, and caching early

**Risk:** Payment integration failures  
**Mitigation:** Thorough testing, sandbox environment, error handling

**Risk:** Image storage costs  
**Mitigation:** Image compression, CDN, Supabase storage optimization

### 12.2 Business Risks
**Risk:** Low initial traffic  
**Mitigation:** SEO optimization, marketing strategy, social media

**Risk:** Fraudulent orders  
**Mitigation:** Email verification, payment gateway fraud detection

---

## 13. Future Enhancements (Post-MVP)

- Advanced search with filters
- Product reviews and ratings
- Wishlist functionality
- Multi-vendor support
- Auction-style listings
- Mobile app (React Native)
- AI-powered product recommendations
- Bulk import/export tools
- Advanced analytics dashboard
- Multi-currency support
- International shipping integration
- Live chat support
- Newsletter/email marketing integration
- Social sharing features
- Product comparison tool

---

## 14. Appendix

### 14.1 Glossary
- **Numismatics:** The study or collection of currency
- **BaaS:** Backend as a Service
- **CDN:** Content Delivery Network
- **Row-Level Security:** Database security feature restricting access per row

### 14.2 References
- Supabase Documentation: https://supabase.com/docs
- React Documentation: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Stripe API: https://stripe.com/docs

---

**Document Version:** 1.0  
**Last Updated:** February 10, 2026  
**Document Owner:** Development Team
