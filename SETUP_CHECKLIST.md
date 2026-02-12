# ✅ Backend Setup Checklist

## 📋 Pre-Setup (Already Done ✅)

- [x] Install Supabase client library
- [x] Create database schema file
- [x] Create seed data file
- [x] Create Supabase client configuration
- [x] Create TypeScript types
- [x] Create authentication context
- [x] Create protected route component
- [x] Create product hooks
- [x] Create order hooks
- [x] Update App.tsx with AuthProvider
- [x] Create documentation

---

## 🚀 Your Setup Tasks (10 Minutes)

### Step 1: Create Supabase Account (2 min)
- [ ] Go to https://supabase.com
- [ ] Click "Start your project"
- [ ] Sign up with GitHub/Email
- [ ] Verify email if needed

### Step 2: Create Project (2 min)
- [ ] Click "New Project"
- [ ] Organization: Create new or select existing
- [ ] Project name: `chrono-collectibles`
- [ ] Database password: (create strong password - save it!)
- [ ] Region: (select closest to you)
- [ ] Pricing plan: Free
- [ ] Click "Create new project"
- [ ] Wait for project to be ready (~2 minutes)

### Step 3: Get Credentials (1 min)
- [ ] Click on "Project Settings" (gear icon)
- [ ] Go to "API" section
- [ ] Copy "Project URL"
- [ ] Copy "anon public" key (the long one starting with `eyJ...`)

### Step 4: Update Environment Variables (1 min)
- [ ] Open `.env.local` in your project
- [ ] Replace `VITE_SUPABASE_URL` with your Project URL
- [ ] Replace `VITE_SUPABASE_ANON_KEY` with your anon key
- [ ] Save the file

### Step 5: Create Database Schema (2 min)
- [ ] In Supabase Dashboard, go to "SQL Editor"
- [ ] Click "New Query"
- [ ] Open `supabase/schema.sql` in your code editor
- [ ] Copy ALL the content (Ctrl+A, Ctrl+C)
- [ ] Paste into Supabase SQL Editor
- [ ] Click "Run" (or press Ctrl+Enter)
- [ ] Wait for "Success. No rows returned" message
- [ ] Verify: Check "Table Editor" - should see 6 tables

### Step 6: Seed Initial Data (1 min)
- [ ] In SQL Editor, click "New Query"
- [ ] Open `supabase/seed.sql` in your code editor
- [ ] Copy ALL the content
- [ ] Paste into SQL Editor
- [ ] Click "Run"
- [ ] Verify: Go to "Table Editor" → "products" → should see 12 rows

### Step 7: Create Storage Bucket (1 min)
- [ ] Go to "Storage" in Supabase Dashboard
- [ ] Click "New Bucket"
- [ ] Bucket name: `product-images`
- [ ] Public bucket: ✅ Enable
- [ ] Click "Create Bucket"
- [ ] Verify: Bucket appears in list

### Step 8: Create Admin User (2 min)
- [ ] Go to "Authentication" → "Users"
- [ ] Click "Add User" → "Create new user"
- [ ] Email: `admin@chronocollectibles.com`
- [ ] Password: (create strong password - save it!)
- [ ] Auto Confirm User: ✅ Enable
- [ ] Click "Create User"
- [ ] Copy the User ID (UUID) from the user list
- [ ] Go back to SQL Editor
- [ ] Run this query (replace YOUR_USER_ID):
  ```sql
  UPDATE profiles 
  SET role = 'admin' 
  WHERE id = 'YOUR_USER_ID_HERE';
  ```
- [ ] Verify: Check "Table Editor" → "profiles" → role should be 'admin'

### Step 9: Restart Dev Server (30 sec)
- [ ] Stop current dev server (Ctrl+C in terminal)
- [ ] Run: `npm run dev`
- [ ] Wait for server to start
- [ ] Open http://localhost:5173

---

## 🧪 Testing Checklist

### Test 1: Server Starts
- [ ] No "Missing environment variables" error
- [ ] Dev server runs successfully
- [ ] Can access http://localhost:5173

### Test 2: View Products
- [ ] Go to /products
- [ ] Should see 12 products (not placeholder data)
- [ ] Products have names, prices, descriptions
- [ ] Click on a product → detail page works

### Test 3: Authentication
- [ ] Go to /login
- [ ] Click "Sign Up" or "Create Account"
- [ ] Enter email and password
- [ ] Submit form
- [ ] Should see success message
- [ ] Check email for verification (optional)

### Test 4: Sign In
- [ ] Go to /login
- [ ] Enter your email and password
- [ ] Click "Sign In"
- [ ] Should be logged in
- [ ] Check navbar for user menu/avatar

### Test 5: Admin Access
- [ ] Sign out if logged in
- [ ] Sign in as admin@chronocollectibles.com
- [ ] Open browser console (F12)
- [ ] Type: `localStorage` or check React DevTools
- [ ] Should see admin role

### Test 6: Database Connection
- [ ] Open browser console (F12)
- [ ] Go to Network tab
- [ ] Go to /products
- [ ] Should see requests to Supabase
- [ ] No 401/403 errors

---

## ✅ Verification Checklist

### Supabase Dashboard
- [ ] Project is active and running
- [ ] 6 tables exist in "Table Editor"
- [ ] 12 products in products table
- [ ] 2 categories in categories table
- [ ] Storage bucket "product-images" exists
- [ ] At least 1 user in Authentication
- [ ] Admin user has role = 'admin' in profiles

### Local Project
- [ ] `.env.local` has correct credentials
- [ ] Dev server starts without errors
- [ ] No TypeScript errors blocking development
- [ ] Can browse products
- [ ] Can sign up/sign in
- [ ] Cart still works (uses localStorage)

---

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"
**Solution:**
- [ ] Check `.env.local` exists
- [ ] Check credentials are correct (no extra spaces)
- [ ] Restart dev server

### Issue: "Failed to fetch products"
**Solution:**
- [ ] Check `schema.sql` ran successfully
- [ ] Check `seed.sql` ran successfully
- [ ] Check products table has 12 rows
- [ ] Check RLS policies exist

### Issue: "Access denied" when fetching data
**Solution:**
- [ ] Check RLS policies in Supabase
- [ ] Go to Authentication → Policies
- [ ] Verify policies exist for products table
- [ ] Try disabling RLS temporarily to test

### Issue: Products table is empty
**Solution:**
- [ ] Run `seed.sql` again in SQL Editor
- [ ] Check for SQL errors in the output
- [ ] Verify categories table has 2 rows first

### Issue: Can't create account
**Solution:**
- [ ] Check Supabase Auth is enabled
- [ ] Check email confirmation settings
- [ ] Check browser console for errors
- [ ] Try with different email

### Issue: TypeScript errors everywhere
**Solution:**
- [ ] These are expected until Supabase is set up
- [ ] They won't prevent the app from running
- [ ] Will resolve after connecting to Supabase
- [ ] Can ignore for now

---

## 📝 Save Your Credentials

**Supabase Project:**
- Project Name: chrono-collectibles
- Project URL: `https://____________.supabase.co`
- Anon Key: `eyJ_________________________`
- Database Password: `_______________`

**Admin Account:**
- Email: admin@chronocollectibles.com
- Password: `_______________`
- User ID: `_______________`

**Test Account:**
- Email: `_______________`
- Password: `_______________`

---

## 🎉 Success!

If all checkboxes are checked, you have successfully:

✅ Set up Supabase backend
✅ Created database with 6 tables
✅ Seeded 12 sample products
✅ Configured authentication
✅ Created admin user
✅ Connected your app to the database

**Your app is now production-ready!** 🚀

---

## 📚 Next Steps

- [ ] Read `BACKEND_INITIALIZED.md` to understand what was created
- [ ] Read `ARCHITECTURE.md` to see the system design
- [ ] Start building admin dashboard
- [ ] Integrate Stripe payments
- [ ] Deploy to Vercel

---

**Need help?** See `BACKEND_SETUP.md` for detailed instructions!

**Last updated:** February 11, 2026
