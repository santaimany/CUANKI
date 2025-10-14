# Vercel Debugging Guide - Quick Reference

## 🔍 How to Debug Vercel Deployment Issues

### 1. Check Vercel Logs
```
1. Open https://vercel.com/your-project
2. Click "Deployments" tab
3. Click latest deployment
4. Click "Functions" tab
5. Look for errors in logs
```

### 2. Check Browser Console
```
F12 → Console tab
Look for:
- ❌ 404 errors (route not found)
- ❌ 500 errors (server error)
- ❌ CORS errors (cross-origin)
- ❌ Mixed content (HTTP vs HTTPS)
- ❌ Network errors (can't reach server)
```

### 3. Check Network Tab
```
F12 → Network tab
Look for:
- Request URL (is it correct?)
- Request Method (GET/POST/etc)
- Status Code (200=OK, 404=Not Found, 500=Error)
- Response body (error message)
- Request payload (data sent)
```

---

## 🐛 Common Errors & Solutions

### Error 1: Double /api/ prefix
```
❌ http://backend.com/api/api/login
✅ http://backend.com/api/login

Fix: Remove /api/ prefix in proxy route
```

### Error 2: Environment variable not set
```
❌ undefined/api/login
✅ http://backend.com/api/login

Fix: Set BACKEND_API_URL in Vercel dashboard
```

### Error 3: Mixed content (HTTP on HTTPS site)
```
❌ Direct call: http://backend.com (blocked by browser)
✅ Use proxy: https://your-app.vercel.app/api/proxy/api/login

Fix: All requests go through proxy
```

### Error 4: CORS error
```
❌ Direct API call from browser (CORS blocked)
✅ Use proxy (same-origin, no CORS issue)

Fix: Use /api/proxy/ route
```

### Error 5: 405 Method Not Allowed
```
❌ Wrong HTTP method (e.g., GET instead of POST)
✅ Use correct method from API docs

Fix: Check backend API documentation
```

---

## 📊 Environment Variables Checklist

### Required in Vercel Dashboard:

```
1. Go to Project Settings → Environment Variables
2. Add:

Name: BACKEND_API_URL
Value: http://103.186.0.127
Scope: Production, Preview, Development

Name: NEXT_PUBLIC_API_URL  
Value: http://103.186.0.127
Scope: Production, Preview, Development
```

### ⚠️ Important:
- ✅ NO quotes: `http://103.186.0.127`
- ❌ With quotes: `'http://103.186.0.127'` (wrong!)
- ✅ NO trailing slash: `http://103.186.0.127`
- ❌ With slash: `http://103.186.0.127/` (wrong!)

---

## 🧪 Testing Proxy Locally

### 1. Build Production
```bash
npm run build
npm run start
```

### 2. Test Endpoints
```bash
# Login
curl -X POST http://localhost:3000/api/proxy/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'

# Get User Data
curl http://localhost:3000/api/proxy/api/greeting-users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Check Console Output
Look for proxy logs:
```
[Proxy] Backend URL: http://103.186.0.127
[Proxy POST] http://103.186.0.127/api/login
```

---

## 📱 Testing on Mobile (Real Device)

### 1. Deploy to Vercel
```bash
git push origin main
# Wait for auto-deploy
```

### 2. Open on Phone
```
https://your-app.vercel.app
```

### 3. Check for Errors
- Open browser console (if supported)
- Or use remote debugging:
  - Android: chrome://inspect
  - iOS: Safari → Develop menu

---

## 🔧 Common Fixes

### Fix 1: Redeploy
```
1. Go to Vercel dashboard
2. Click "Redeploy"
3. Check "Use existing build cache" OFF
4. Click "Redeploy"
```

### Fix 2: Clear Cache
```
1. In browser: Ctrl+Shift+Delete
2. Clear cache and cookies
3. Hard refresh: Ctrl+Shift+R
```

### Fix 3: Check Environment Variables
```
1. Vercel → Settings → Environment Variables
2. Verify all variables are set
3. Redeploy after changes
```

### Fix 4: Check Backend URL
```typescript
// In browser console:
console.log(process.env.NEXT_PUBLIC_API_URL);

// Should output:
// http://103.186.0.127
```

---

## 📋 Deployment Checklist

Before deploying:

- [ ] All environment variables set in Vercel
- [ ] No hardcoded localhost URLs in code
- [ ] All API calls use proxy (/api/proxy/)
- [ ] No direct HTTP calls to backend
- [ ] Build succeeds locally (`npm run build`)
- [ ] TypeScript compiles without errors
- [ ] No console errors in browser

After deploying:

- [ ] Check Vercel function logs
- [ ] Test login/register
- [ ] Test all dashboard pages
- [ ] Test on real mobile device
- [ ] Check browser console for errors
- [ ] Verify all API calls work

---

## 🆘 Still Not Working?

### Check These:

1. **Backend Server Running?**
   - Can you ping http://103.186.0.127?
   - Is backend accessible from Vercel servers?
   - Check backend firewall/security settings

2. **Vercel Function Timeout?**
   - Default timeout: 10 seconds
   - Check if backend responds within timeout
   - Increase timeout if needed (Pro plan)

3. **Backend CORS Settings?**
   - Backend should allow Vercel domain
   - Or use proxy (bypasses CORS)

4. **Rate Limiting?**
   - Backend might rate-limit Vercel IPs
   - Check backend logs

---

## 📞 Support Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: https://github.com/santaimany/CUANKI/issues
- Project Docs: See `/docs` folder

---

## 🎯 Key Files to Check

When debugging issues:

```
src/lib/axios.ts                          - Axios config
src/app/api/proxy/[...path]/route.ts      - Proxy implementation
.env.local                                 - Local env vars
Vercel Dashboard → Environment Variables   - Production env vars
```

---

## 💡 Pro Tips

1. **Always test locally first** with production build
2. **Check Vercel logs** before guessing the issue
3. **Use browser DevTools** to see actual network requests
4. **Don't hardcode URLs** - use environment variables
5. **Use proxy for all API calls** to avoid CORS/mixed content
6. **Keep error messages detailed** for easier debugging

---

Last Updated: October 14, 2025
