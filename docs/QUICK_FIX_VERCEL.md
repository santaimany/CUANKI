# 🔥 Quick Fix Guide - Vercel Deployment Error

## ⚡ Masalah Sekarang:
```
POST https://cuanki.vercel.app/api/proxy/api/login 500 (Internal Server Error)
{error: 'Failed to post to backend'}
```

---

## 🎯 Solusi Langsung (5 Menit):

### **Step 1: Set Environment Variables di Vercel**

1. **Buka:** https://vercel.com/dashboard
2. **Pilih project:** cuanki
3. **Go to:** Settings → Environment Variables
4. **Add variables:**

```env
Key: BACKEND_API_URL
Value: http://103.186.0.127

Key: NEXT_PUBLIC_API_URL  
Value: /api/proxy
```

**⚠️ PENTING:**
- ❌ JANGAN pakai quotes: `'http://103.186.0.127'`
- ✅ Langsung tulis: `http://103.186.0.127`
- ❌ JANGAN trailing slash: `http://103.186.0.127/`
- ✅ Set untuk: **Production, Preview, Development**

### **Step 2: Redeploy**

**Option A - Auto (Recommended):**
```bash
git add .
git commit -m "fix: Improve proxy error handling"
git push origin main
```

**Option B - Manual:**
1. Go to Vercel dashboard
2. Click **Deployments**
3. Click **⋮** on latest deployment
4. Click **Redeploy**

### **Step 3: Wait & Test**
1. Wait for deployment finish (~2 minutes)
2. Buka: https://cuanki.vercel.app/login
3. Try login
4. ✅ Should work now!

---

## 🔍 Verify Environment Variables

Setelah set, check di Vercel Dashboard:

**Settings → Environment Variables should show:**
```
BACKEND_API_URL = http://103.186.0.127
NEXT_PUBLIC_API_URL = /api/proxy
```

**NOT like this (WRONG):**
```
BACKEND_API_URL = 'http://103.186.0.127'  ❌ (has quotes)
BACKEND_API_URL = "http://103.186.0.127"  ❌ (has quotes)
BACKEND_API_URL = http://103.186.0.127/   ❌ (trailing slash)
```

---

## 🧪 Debug - Check Logs

### **Vercel Function Logs:**
1. Go to: **Deployments** → Latest deployment
2. Click: **View Function Logs**
3. Try login from app
4. Look for logs:
   ```
   [Proxy] Backend URL: http://103.186.0.127
   [Proxy POST] http://103.186.0.127/api/login
   [Proxy POST Body] {"username":"...","password":"..."}
   ```

### **Expected Success Log:**
```
[Proxy] Backend URL: http://103.186.0.127
[Proxy POST] http://103.186.0.127/api/login
[Proxy POST Body] {"username":"test","password":"test123"}
[Proxy POST Response Status] 200
```

### **If Error Log Shows:**
```
[Proxy POST Error]: { error: 'fetch failed' }
```
**Meaning:** Backend tidak bisa diakses dari Vercel
**Solution:** 
- Check backend server masih running
- Check IP `103.186.0.127` accessible dari internet
- Test: `curl http://103.186.0.127/api/login`

---

## 📱 Browser Console

### **Expected (Success):**
```
🌐 Using API Proxy for production
🔐 Request to /api/login with token: ...
✅ Login successful
```

### **If Still Error:**
```
❌ POST https://cuanki.vercel.app/api/proxy/api/login 500
```

**Quick fixes:**
1. Hard refresh: `Ctrl+Shift+R`
2. Clear site data: DevTools → Application → Clear storage
3. Check environment variables ada di Vercel
4. Redeploy setelah set environment variables

---

## ✅ Success Indicators

Semua ini harus ✅:
- [ ] Environment variables set di Vercel (2 variables)
- [ ] No quotes di values
- [ ] Redeployed after setting variables
- [ ] Vercel logs show: `[Proxy] Backend URL: http://103.186.0.127`
- [ ] No "Mixed Content" error di browser
- [ ] Login works in production

---

## 🚨 Still Not Working?

### **Alternative Solution: Direct Backend Access (Temporary)**

Jika proxy masih bermasalah, temporary solution:

1. **Update axios.ts:**
```typescript
const getBaseURL = () => {
    // Force direct backend (TEMPORARY - will have mixed content warning)
    return 'http://103.186.0.127';
};
```

2. **Deploy**
3. **Browser akan show warning, tapi app works**

**⚠️ Cons:**
- ❌ Mixed content warning
- ❌ Some browsers may block
- ❌ Not secure

**✅ Better solution:** Backend harus support HTTPS

---

## 📊 Current Code Changes

### ✅ Already Fixed:
1. **Proxy route** (`src/app/api/proxy/[...path]/route.ts`)
   - Better error logging
   - Clean URL (remove quotes)
   - 10s timeout
   - Detailed error messages

2. **Axios** (`src/lib/axios.ts`)
   - Auto use proxy in production
   - Direct backend in development

### ⏳ Waiting for:
1. **Set environment variables di Vercel**
2. **Redeploy**
3. **Test**

---

## 🎬 Next Steps

1. ✅ Code sudah fixed (proxy + axios)
2. ⏳ **YOU DO:** Set environment variables di Vercel
3. ⏳ **YOU DO:** Redeploy
4. ⏳ Test login/register
5. ✅ Should work!

---

**⏱️ Time Estimate:** 5 minutes
**🔧 Difficulty:** Easy (just set variables)
**📍 Status:** Waiting for environment variable setup
