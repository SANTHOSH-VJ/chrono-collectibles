# 🔧 Schema Error Fix

## ✅ Problem Solved!

The error you encountered:
```
ERROR: 42710: policy "Users can view own profile" for table "profiles" already exists
```

This happened because the schema was trying to create policies that already existed.

## ✅ Solution Applied

I've updated `supabase/schema.sql` to be **idempotent** (safe to run multiple times).

### What Changed:
- ✅ Added `DROP POLICY IF EXISTS` before each `CREATE POLICY`
- ✅ Added `DROP TRIGGER IF EXISTS` before each `CREATE TRIGGER`
- ✅ Added `ON CONFLICT DO NOTHING` to INSERT statements
- ✅ All `CREATE TABLE` already had `IF NOT EXISTS`

## 🚀 How to Use

### Option 1: Run Updated Schema (Recommended)
The updated `schema.sql` will now work even if policies exist:

1. Go to Supabase SQL Editor
2. Copy ALL of `supabase/schema.sql`
3. Paste and Run
4. ✅ Should complete successfully!

### Option 2: Reset and Start Fresh
If you want to completely reset the database:

1. Go to Supabase SQL Editor
2. Copy ALL of `supabase/reset.sql`
3. Paste and Run (this deletes everything)
4. Then run `schema.sql` again
5. Then run `seed.sql`

## 📝 Files Created

1. **schema.sql** (Updated) - Now safe to run multiple times
2. **reset.sql** (New) - Clean slate script if needed

## ⚠️ Important Notes

### What Gets Reset:
- ✅ All tables and data
- ✅ All policies
- ✅ All triggers
- ✅ All functions

### What Stays:
- ✅ Auth users (managed separately)
- ✅ Storage bucket (manual deletion if needed)

## 🧪 Test It

After running the updated schema:

```sql
-- Verify tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- Should show:
-- profiles
-- categories
-- products
-- product_images
-- orders
-- order_items

-- Verify policies exist
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';

-- Should show all 17 policies

-- Verify categories were seeded
SELECT * FROM categories;

-- Should show 2 categories
```

## ✅ Next Steps

1. ✅ Run updated `schema.sql` in Supabase SQL Editor
2. ✅ Run `seed.sql` to add products
3. ✅ Continue with setup (create admin user, etc.)

## 🆘 If You Still Get Errors

### Error: "relation already exists"
**Solution:** Tables already exist, schema is working! Just run `seed.sql`

### Error: "trigger already exists"
**Solution:** The updated schema now handles this - try running it again

### Error: "permission denied"
**Solution:** Make sure you're using the SQL Editor in Supabase Dashboard (not a client)

### Want to start completely fresh?
**Solution:** Run `reset.sql` first, then `schema.sql`, then `seed.sql`

## 📚 Reference

### Schema File Structure:
```
1. Create tables (IF NOT EXISTS)
2. Create indexes (IF NOT EXISTS)
3. Enable RLS
4. Drop old policies (IF EXISTS)
5. Create new policies
6. Drop old triggers (IF EXISTS)
7. Create functions (OR REPLACE)
8. Create new triggers
9. Seed categories (ON CONFLICT DO NOTHING)
10. Create storage bucket (ON CONFLICT DO NOTHING)
11. Create storage policies
```

This structure ensures the script can be run multiple times safely!

---

**✅ You're all set! The schema is now fixed and ready to use.**
