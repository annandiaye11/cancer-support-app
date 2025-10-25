# Fix: Appointments Not Showing in Dashboard Statistics

## 🔴 Problem Identified

The dashboard shows 0 appointments even when appointments are created in the system.

### Root Cause

**Multiple temporary userIds being created**: The application was creating a new temporary `userId` on every session/page reload, causing a mismatch between:
- The `userId` used when creating appointments
- The `userId` used when fetching statistics

**Example of the issue:**
```
- Appointment created with userId: temp-1761400776447
- Stats fetched with userId: temp-1761401234567 (different!)
- Result: No appointments found → 0 shown in dashboard
```

## ✅ Solutions Implemented

### 1. Fixed `use-user-id.ts` Hook ✓

**Before:** Checked session first, then localStorage, creating new IDs inconsistently
**After:** Checks localStorage FIRST to maintain persistence

Key changes:
```typescript
// Now checks localStorage FIRST before creating new ID
let storedUserId = localStorage.getItem('userId')
if (storedUserId) {
  setUserId(storedUserId)
  return
}
// Only creates new ID if none exists
```

### 2. Added Debug Logging ✓

Added console logs to track userId throughout the application:
- `use-user-id.ts`: Logs when new userId is created
- `home-section.tsx`: Logs userId being used for stats
- `app/api/stats/route.ts`: Logs userId received and appointments found

### 3. Created Migration Script ✓

Created `/scripts/fix-user-ids.ts` to consolidate all existing appointments under a single userId.

## 🚀 How to Fix Your Existing Data

### Option 1: Run the Migration Script (Recommended)

```bash
npx tsx scripts/fix-user-ids.ts
```

This will:
- Consolidate all appointments under userId: `user-default-dev`
- Show statistics about current state
- Provide instructions for browser setup

Then in your browser console:
```javascript
localStorage.setItem('userId', 'user-default-dev')
```

Reload the page and all appointments will now appear!

### Option 2: Manual Browser Fix

1. Open browser DevTools (F12)
2. Go to Console tab
3. Run:
```javascript
// Check current userId
console.log('Current:', localStorage.getItem('userId'))

// Set to a specific userId from your appointments
localStorage.setItem('userId', 'temp-1761400776447')

// Reload page
location.reload()
```

### Option 3: Start Fresh

Clear localStorage and create all new appointments:
```javascript
localStorage.clear()
location.reload()
```

## 🔍 How to Verify the Fix

1. **Check userId in console**: After page load, you should see:
   ```
   🆔 Nouvel ID utilisateur temporaire créé: temp-xxxxx
   ```
   OR
   ```
   🆔 Home Section - userId actuel: temp-xxxxx
   ```

2. **Check stats API**: Open DevTools Network tab, look for `/api/stats` call:
   ```
   📊 Stats API - userId reçu: temp-xxxxx
   📊 Stats API - Rendez-vous trouvés pour userId: X
   📊 Stats API - Rendez-vous à venir: Y
   ```

3. **Verify persistence**: Reload the page several times - userId should remain the same

## 📊 Expected Behavior After Fix

- ✅ Same userId persists across page reloads
- ✅ Appointments created show up immediately in dashboard stats
- ✅ Stats accurately reflect: upcoming appointments, completed tasks
- ✅ Console logs help debug any future issues

## 🔮 Future Improvements

Consider implementing:
1. **Proper authentication system** to replace temporary userIds
2. **Migration to use NextAuth sessions** for permanent user tracking
3. **Database cleanup script** to remove orphaned appointments
4. **User profile page** showing current userId for debugging

## 📝 Files Modified

- `hooks/use-user-id.ts` - Fixed localStorage check order
- `components/home-section.tsx` - Added debug logging
- `app/api/stats/route.ts` - Added debug logging
- `scripts/fix-user-ids.ts` - Created migration script (NEW)

---

**Date:** October 25, 2025
**Status:** ✅ Fixed
