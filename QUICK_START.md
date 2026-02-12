# 🚀 Quick Start - Backend Setup

## ⚡ 5-Minute Setup Checklist

### 1️⃣ Create Supabase Account (2 min)
- [ ] Go to https://supabase.com
- [ ] Sign up (free)
- [ ] Create project: "chrono-collectibles"
- [ ] Wait for project to be ready

### 2️⃣ Get Credentials (1 min)
- [ ] Go to Project Settings → API
- [ ] Copy **Project URL**
- [ ] Copy **anon public** key

### 3️⃣ Update Environment (30 sec)
- [ ] Open `.env.local`
- [ ] Paste your URL and key
- [ ] Save file

### 4️⃣ Create Database (1 min)
- [ ] Supabase → SQL Editor
- [ ] Copy all of `supabase/schema.sql`
- [ ] Paste and Run
- [ ] Wait for "Success"

### 5️⃣ Add Products (30 sec)
- [ ] SQL Editor → New Query
- [ ] Copy all of `supabase/seed.sql`
- [ ] Paste and Run

### 6️⃣ Create Storage (30 sec)
- [ ] Supabase → Storage
- [ ] New Bucket: `product-images`
- [ ] Public: ✅
- [ ] Create

### 7️⃣ Create Admin User (1 min)
- [ ] Authentication → Users → Add User
- [ ] Email: admin@chronocollectibles.com
- [ ] Password: (your choice)
- [ ] Auto Confirm: ✅
- [ ] Copy User ID
- [ ] SQL Editor:
```sql
UPDATE profiles SET role = 'admin' WHERE id = 'paste-id-here';
```

### 8️⃣ Restart Server (10 sec)
```bash
npm run dev
```

## ✅ Done!

Your app is now connected to a real database! 🎉

---

## 📖 Full Documentation

- **Detailed Guide**: See `BACKEND_SETUP.md`
- **What Was Created**: See `BACKEND_INITIALIZED.md`
- **Database Schema**: See `supabase/schema.sql`
- **Seed Data**: See `supabase/seed.sql`

---

## 🧪 Test It

1. Go to http://localhost:5173
2. Try creating an account
3. Browse products (should show 12 items from database)
4. Sign in as admin to test admin features

---

## 🆘 Issues?

**"Missing environment variables"**
→ Update `.env.local` and restart server

**"No products showing"**
→ Run `seed.sql` in Supabase SQL Editor

**TypeScript errors**
→ Normal until Supabase is set up - they won't affect functionality

---

## 📝 Your Credentials

```env
VITE_SUPABASE_URL=https://__________.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ__________________________
```

**Admin Login:**
- Email: admin@chronocollectibles.com
- Password: _______________

---

**Total Time: ~5-10 minutes** ⏱️
