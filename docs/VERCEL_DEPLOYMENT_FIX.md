# Vercel Deployment - Mixed Content & Proxy Issues Fix

## ❌ Masalah yang Terjadi:

### 1. **Mixed Content Error**
```
Mixed Content: The page at 'https://cuanki.vercel.app/register' was loaded over HTTPS, 
but requested an insecure XMLHttpRequest endpoint 'http://103.186.0.127/api/register'. 
This request has been blocked; the content must be served over HTTPS.
```

**Penyebab:** 
- Frontend di-host di Vercel dengan HTTPS
- Backend API menggunakan HTTP (tidak secure)
- Browser memblokir request HTTP dari halaman HTTPS

### 2. **Proxy 500 Error**
```
POST https://cuanki.vercel.app/api/proxy/api/login 500 (Internal Server Error)
{error: 'Failed to post to backend'}
```

**Penyebab:**
- Environment variable tidak terset dengan benar
- Vercel serverless function tidak bisa connect ke backend
- Backend URL salah format (ada quotes)

---

## ✅ Solusi yang Sudah Diterapkan:

### 1. **API Proxy Route** (`src/app/api/proxy/[...path]/route.ts`)
- ✅ Semua request ke backend melalui proxy Next.js
- ✅ Proxy running di Vercel serverless function (HTTPS)
- ✅ Proxy forward request ke backend HTTP
- ✅ Browser hanya lihat HTTPS request

### 2. **Axios Configuration** (`src/lib/axios.ts`)
- ✅ Base URL: `/api/proxy` (relative, menggunakan proxy)
- ✅ Fallback ke direct backend di development
- ✅ Clean URL (remove quotes jika ada)
- ✅ Timeout 10 detik

### 3. **Environment Variables**
- ✅ `NEXT_PUBLIC_API_URL` untuk client-side
- ✅ `BACKEND_API_URL` untuk server-side (proxy)
- ✅ Auto-clean quotes dan trailing slash

---

## 🔧 Setup Environment Variables di Vercel

### **Step 1: Buka Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Pilih project: **cuanki**
3. Click: **Settings** → **Environment Variables**

### **Step 2: Tambahkan Variables**

Tambahkan 2 environment variables:

| Key | Value | Environments |
|-----|-------|--------------|
| `NEXT_PUBLIC_API_URL` | `/api/proxy` | Production, Preview, Development |
| `BACKEND_API_URL` | `http://103.186.0.127` | Production, Preview, Development |

**⚠️ PENTING:**
- **JANGAN pakai quotes** di value! (`http://103.186.0.127` ✅, `'http://103.186.0.127'` ❌)
- **JANGAN trailing slash** (`http://103.186.0.127` ✅, `http://103.186.0.127/` ❌)

### **Step 3: Redeploy**
Setelah set environment variables:
```bash
# Push ke GitHub (trigger auto-deploy)
git add .
git commit -m "fix: Update proxy with better error handling"
git push origin main

# Atau manual redeploy di Vercel dashboard
```

---

## 🧪 Testing

### **1. Check Environment Variables**
Setelah deploy, test API proxy:
```
https://cuanki.vercel.app/api/proxy/login
```

Response seharusnya menunjukkan error detail dengan URL yang benar.

### **2. Check Console Logs**
Di Vercel Dashboard:
1. Go to: **Deployments** → Latest deployment
2. Click: **View Function Logs**
3. Look for:
   ```
   [Proxy] Backend URL: http://103.186.0.127
   [Proxy POST] http://103.186.0.127/api/login
   ```

### **3. Test Login/Register**
1. Buka: https://cuanki.vercel.app/login
2. Try login dengan credentials
3. Check browser console untuk errors
4. Check Vercel function logs untuk proxy logs

---

## 🆘 Troubleshooting

### **Issue 1: Still Getting Mixed Content Error**

**Diagnosis:**
Browser masih hit backend directly (bypassing proxy)

**Solution:**
1. Hard refresh: `Ctrl+Shift+R` (clear cache)
2. Check axios.ts: `baseURL` harus `/api/proxy`
3. Check `.env.local` tidak override dengan direct URL

---

### **Issue 2: Proxy Returns 500 Error**

**Diagnosis:**
Proxy tidak bisa connect ke backend

**Possible Causes & Solutions:**

**A. Backend URL Salah**
```bash
# Check Vercel logs
[Proxy] Backend URL: 'http://103.186.0.127'  # ❌ Ada quotes
[Proxy] Backend URL: http://103.186.0.127    # ✅ Correct
```
**Fix:** Update environment variable tanpa quotes

**B. Backend Down/Unreachable**
```bash
# Check Vercel logs
[Proxy POST Error]: { error: 'fetch failed' }
```
**Fix:** 
- Pastikan backend server running
- Pastikan IP `103.186.0.127` accessible dari internet
- Test direct access: `curl http://103.186.0.127/api/login`

**C. Timeout**
```bash
[Proxy POST Error]: { error: 'aborted' }
```
**Fix:**
- Backend too slow (>10 seconds)
- Increase timeout di proxy route.ts
- Optimize backend API

---

### **Issue 3: Environment Variables Not Working**

**Diagnosis:**
`process.env.BACKEND_API_URL` returns undefined

**Solution:**
1. Check variable name exact match (case-sensitive)
2. Redeploy after setting variables
3. Check variable set for correct environment (Production/Preview)
4. Try using Vercel CLI:
   ```bash
   vercel env pull .env.local
   ```

---

### **Issue 4: Works in Development, Fails in Production**

**Diagnosis:**
Different environment variables or network access

**Solution:**
1. **Development:** Direct backend access (bypass proxy)
2. **Production:** Must use proxy
3. Set `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://103.186.0.127
   BACKEND_API_URL=http://103.186.0.127
   ```
4. Production uses Vercel environment variables

---

## 📊 How It Works

### **Development (Local):**
```
Browser → Next.js Dev Server → Direct to Backend
        (http://localhost:3000)   (http://103.186.0.127)
```

### **Production (Vercel):**
```
Browser → Vercel (HTTPS) → API Proxy → Backend (HTTP)
        (HTTPS)          (Serverless)  (http://103.186.0.127)
```

**Key Points:**
- ✅ Browser only sees HTTPS (no mixed content)
- ✅ Proxy handles HTTP backend connection
- ✅ CORS handled by Next.js API route
- ✅ No browser security blocks

---

## 🎯 Final Checklist

Before going to production, verify:

- [ ] Environment variables set di Vercel (no quotes, no trailing slash)
- [ ] Redeploy after setting environment variables
- [ ] Check Vercel function logs shows correct backend URL
- [ ] Test login/register from deployed app
- [ ] No mixed content errors in browser console
- [ ] No CORS errors
- [ ] Response time acceptable (<5 seconds)

---

## 💡 Alternative Solutions

### **Option 1: Use HTTPS Backend (Recommended)**
Jika backend bisa support HTTPS:
```
BACKEND_API_URL=https://api.cuanki.com
```
Keuntungan:
- ✅ No mixed content issues
- ✅ No proxy needed (direct connection)
- ✅ Faster (less hop)
- ✅ More secure

### **Option 2: Cloudflare Tunnel**
Jika backend tidak bisa HTTPS:
1. Install Cloudflare Tunnel di backend server
2. Get HTTPS URL: `https://backend.tunnel.com`
3. Update environment variables

### **Option 3: Custom Domain dengan SSL**
Setup reverse proxy dengan Nginx + Let's Encrypt:
```nginx
server {
    listen 443 ssl;
    server_name api.cuanki.com;
    
    location / {
        proxy_pass http://103.186.0.127;
    }
}
```

---

## 📚 Resources

- [Mixed Content Explanation](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [CORS in Next.js](https://nextjs.org/docs/api-routes/api-middlewares)

---

## 🚀 Status

- ✅ Proxy route created with detailed logging
- ✅ Error handling improved
- ✅ Timeout added (10 seconds)
- ✅ URL cleaning implemented
- ⏳ **Waiting:** Set environment variables di Vercel
- ⏳ **Testing:** Verify login/register after deploy

---

**Last Updated:** 2025-10-14
**Status:** Ready for deployment testing
