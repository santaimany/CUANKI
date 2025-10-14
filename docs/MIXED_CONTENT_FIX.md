# Mixed Content Error Fix - HTTPS/HTTP Issue

## 🔴 Problem

Vercel menggunakan HTTPS, tapi backend di `http://103.186.0.127` menggunakan HTTP.
Browser memblokir request HTTP dari halaman HTTPS (Mixed Content Error).

**Error:**
```
Mixed Content: The page at 'https://cuanki.vercel.app/register' was loaded over HTTPS, 
but requested an insecure XMLHttpRequest endpoint 'http://103.186.0.127/api/register'. 
This request has been blocked; the content must be served over HTTPS.
```

---

## ✅ Solution: API Proxy

Dibuat API proxy di Next.js untuk meneruskan request dari frontend (HTTPS) ke backend (HTTP).

### Flow:
```
Frontend (HTTPS)
    ↓
Next.js Proxy (HTTPS) → Backend (HTTP)
    ↓
Frontend (HTTPS)
```

Semua komunikasi dari browser tetap HTTPS, tapi Next.js server-side bisa akses HTTP backend.

---

## 📂 Files Created/Modified

### 1. **Created: `src/app/api/proxy/[...path]/route.ts`**
- Catch-all API route yang meneruskan semua request ke backend
- Support semua HTTP methods: GET, POST, PUT, PATCH, DELETE
- Meneruskan Authorization header untuk token

### 2. **Modified: `src/lib/axios.ts`**
- Deteksi environment (production vs development)
- Production: gunakan `/api/proxy` (internal Next.js)
- Development: gunakan direct URL `http://103.186.0.127`

---

## 🔧 How It Works

### Development (localhost):
```typescript
baseURL = 'http://103.186.0.127'
Request: http://localhost:3000 → http://103.186.0.127/api/login ✅
```

### Production (Vercel):
```typescript
baseURL = '/api/proxy'
Request: https://cuanki.vercel.app/api/proxy/login 
      → Next.js server: http://103.186.0.127/api/login ✅
```

---

## 🚀 Deployment Steps

### 1. **Update Environment Variables di Vercel**

Tambahkan variable baru:
```
BACKEND_API_URL=http://103.186.0.127
```

**Note:** Ini variable untuk server-side, bukan `NEXT_PUBLIC_*`

### 2. **Deploy**
```bash
git add .
git commit -m "fix: Add API proxy for mixed content issue"
git push origin main
```

Vercel akan auto-deploy.

### 3. **Test**
- Buka https://cuanki.vercel.app/login
- Coba login
- Check Network tab, request seharusnya ke `/api/proxy/login` ✅
- Tidak ada Mixed Content error lagi ✅

---

## 🧪 Testing

### Test Proxy Endpoint:
```bash
# Test di production
curl https://cuanki.vercel.app/api/proxy/greeting-users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Check Browser Console:
```javascript
// Development
🌐 API Base URL: http://103.186.0.127

// Production
🌐 Using API Proxy for production
```

---

## 📊 Proxy Features

### ✅ Supported HTTP Methods:
- GET - Fetch data
- POST - Create/Login/Register
- PUT - Full update
- PATCH - Partial update
- DELETE - Remove data

### ✅ Headers Forwarding:
- Authorization (Bearer token)
- Content-Type
- Custom headers dari axios interceptor

### ✅ Error Handling:
- Catch network errors
- Return proper status codes
- Log errors for debugging

---

## 🔍 URL Mapping Examples

### Login:
```
Frontend call: axiosInstance.post('/api/login', data)
Development:   http://103.186.0.127/api/login
Production:    /api/proxy/login → http://103.186.0.127/api/login
```

### Get Accounts:
```
Frontend call: axiosInstance.get('/api/user-accounts')
Development:   http://103.186.0.127/api/user-accounts
Production:    /api/proxy/user-accounts → http://103.186.0.127/api/user-accounts
```

### Update Balance:
```
Frontend call: axiosInstance.patch('/api/update-account-balance', data)
Development:   http://103.186.0.127/api/update-account-balance
Production:    /api/proxy/update-account-balance → http://103.186.0.127/api/update-account-balance
```

---

## ⚠️ Important Notes

1. **No Code Changes Needed** di frontend components
   - Semua API calls tetap sama
   - axios.ts handle switching otomatis

2. **Environment Detection**
   - Cek `window.location.hostname !== 'localhost'`
   - Production otomatis gunakan proxy

3. **Backend URL** tidak boleh HTTPS
   - Jika backend sudah HTTPS, tidak perlu proxy
   - Bisa langsung set `NEXT_PUBLIC_API_URL=https://your-api.com`

4. **Token Forwarding** otomatis
   - axios interceptor add Authorization header
   - Proxy forward ke backend

---

## 🆘 Troubleshooting

### "Proxy not working"
```bash
# Check environment variable di Vercel
BACKEND_API_URL=http://103.186.0.127 ✅

# Jangan pakai NEXT_PUBLIC_ untuk server-side env
NEXT_PUBLIC_BACKEND_API_URL=... ❌
```

### "404 on proxy route"
```bash
# Pastikan folder structure benar
src/app/api/proxy/[...path]/route.ts ✅

# Bukan:
src/app/api/proxy/route.ts ❌
```

### "CORS error"
```bash
# Proxy menghilangkan CORS issue karena request dari server
# Jika masih ada CORS, cek backend CORS config
```

### "Token not forwarded"
```bash
# Check axios interceptor di axios.ts
# Pastikan localStorage.getItem('token') ada value
# Check Network tab → Request Headers → Authorization
```

---

## 🎯 Benefits

✅ **No Mixed Content Error** - Browser happy dengan full HTTPS
✅ **No Backend Changes** - Backend tetap HTTP
✅ **No CORS Issues** - Request dari server, bukan browser
✅ **Same Code** - Frontend code tidak perlu diubah
✅ **Development Friendly** - Local dev tetap direct ke backend
✅ **Production Ready** - Auto switch ke proxy di Vercel

---

## 🔮 Future: Migrate to HTTPS Backend

Ideal solution adalah backend support HTTPS:

1. Install SSL certificate di backend server
2. Update URL ke `https://your-backend.com`
3. Remove proxy (tidak diperlukan lagi)
4. Update environment variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend.com
   ```

Tapi untuk sekarang, proxy solution works perfectly! 🎉
