# Google OAuth Login Integration

## 📋 Overview

Fitur Google OAuth Login memungkinkan user untuk login menggunakan akun Google mereka. Integrasi ini menggunakan backend API untuk menangani OAuth flow dan mengembalikan JWT token.

## 🔗 Endpoints

### 1. **Initiate Google OAuth**
```
GET /api/auth/google
```
**Deskripsi:** Redirect user ke halaman Google OAuth untuk authorize aplikasi.

**Flow:**
1. User klik "Continue with Google"
2. Frontend redirect ke `/api/auth/google`
3. Backend redirect ke Google OAuth consent screen
4. User authorize aplikasi
5. Google redirect kembali ke callback URL

---

### 2. **Google OAuth Callback**
```
GET /api/auth/google/callback
```
**Deskripsi:** Endpoint yang dipanggil Google setelah user authorize aplikasi.

**Query Parameters (dari Google):**
- `code`: Authorization code dari Google
- `state`: CSRF protection token (optional)

**Success Response:**
Redirect ke: `/auth/google/callback?token={JWT_TOKEN}`

**Error Response:**
Redirect ke: `/auth/google/callback?error={ERROR_MESSAGE}`

---

## 📂 File Structure

```
src/
├── lib/
│   └── services/
│       └── authService.ts             # Google OAuth initiation logic
├── components/
│   └── auth/
│       ├── login/
│       │   └── LoginForm.tsx          # Google login button
│       └── register/
│           └── RegisterForm.tsx       # Google signup button
└── app/
    └── auth/
        └── google/
            └── callback/
                └── page.tsx           # Google OAuth callback handler
```

---

## 🔧 Implementation Details

### **1. authService.ts**

**Function: `initiateGoogleLogin()`**
```typescript
// Helper function to get base URL
const getBaseURL = (): string => {
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
        return '/api/proxy'; // Production (Vercel) - use proxy
    }
    return process.env.NEXT_PUBLIC_API_URL || 'http://103.186.0.127'; // Development
};

/**
 * Initiate Google OAuth login flow
 * Redirects user to backend Google OAuth endpoint
 */
export const initiateGoogleLogin = (): void => {
    const baseURL = getBaseURL();
    const googleAuthUrl = `${baseURL}/api/auth/google`;
    
    console.log('🔐 Initiating Google OAuth login:', googleAuthUrl);
    
    // Redirect to Google OAuth
    window.location.href = googleAuthUrl;
};
```

### **2. LoginForm.tsx**

**Import:**
```typescript
import { loginUser, initiateGoogleLogin } from '@/lib/services/authService';
```

**Button:**
### **4. Google Callback Page (`/auth/google/callback/page.tsx`)**
<button
    type="button"
    onClick={initiateGoogleLogin}
    className="w-full bg-white text-gray-600 py-4 sm:py-5 rounded-2xl..."
>
    <svg>...</svg>
    <span>Continue with google</span>
</button>
```

### **3. RegisterForm.tsx**

**Import:**
```typescript
import { registerUser, initiateGoogleLogin } from '@/lib/services/authService';
```

**Button:**
```tsx
<button
    type="button"
    onClick={initiateGoogleLogin}
    className="w-full bg-white text-gray-600 py-4 sm:py-5 rounded-3xl..."
>
    <svg>...</svg>
    <span>Sign up with google</span>
</button>
```

---

### **2. Google Callback Page (`/auth/google/callback/page.tsx`)**

**Responsibilities:**
1. ✅ Extract `token` or `error` from URL query parameters
2. ✅ Save token to `localStorage`
3. ✅ Fetch user profile to check onboarding status
4. ✅ Redirect to `/dashboard` or `/onboarding` based on completion status
5. ✅ Handle errors and redirect to `/login` if failed

**Flow Diagram:**
```
URL: /auth/google/callback?token=xxx
  ↓
Extract token from query params
  ↓
Save to localStorage
  ↓
Fetch user profile (GET /api/user)
  ↓
Check onboarding status:
  - username ✓
  - age ✓
  - origin_id ✓
  - status ✓
  - origin ✓
  ↓
Redirect:
  - All complete → /dashboard
  - Incomplete → /onboarding
```

**States:**
- `loading`: Processing authentication
- `success`: Login successful, redirecting
- `error`: Authentication failed

---

## 🔄 Complete OAuth Flow

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User clicks "Continue with Google" button                    │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. Frontend redirects to /api/auth/google                       │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. Backend redirects to Google OAuth consent screen             │
│    (https://accounts.google.com/o/oauth2/v2/auth)              │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. User authorizes application on Google                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. Google redirects to /api/auth/google/callback?code=xxx      │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. Backend exchanges code for access_token                      │
│    - Fetches user info from Google                              │
│    - Creates/updates user in database                           │
│    - Generates JWT token                                        │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. Backend redirects to frontend callback:                      │
│    /auth/google/callback?token={JWT_TOKEN}                     │
└────────────────────┬────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. Frontend callback page:                                      │
│    - Saves token to localStorage                                │
│    - Fetches user profile                                       │
│    - Checks onboarding status                                   │
│    - Redirects to /dashboard or /onboarding                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🌐 Environment Configuration

### **Development (localhost):**
- Direct connection to backend: `http://103.186.0.127`
- No proxy needed

### **Production (Vercel):**
- Use API proxy: `/api/proxy`
- Proxy forwards to backend at `http://103.186.0.127`
- Avoids HTTPS/HTTP mixed content errors

**Environment Variables:**
```env
# Development (.env.local)
NEXT_PUBLIC_API_URL=http://103.186.0.127

# Production (Vercel dashboard)
BACKEND_API_URL=http://103.186.0.127
```

---

## 🔐 Security Considerations

### **1. Token Storage**
- JWT token disimpan di `localStorage`
- Token otomatis di-attach ke setiap API request via Axios interceptor

### **2. CSRF Protection**
- Backend harus implement `state` parameter untuk prevent CSRF attacks
- State parameter di-generate di backend saat initiate OAuth

### **3. Callback URL Validation**
- Backend harus validate callback URL untuk prevent redirect attacks
- Whitelist frontend domain di backend OAuth config

### **4. Token Expiration**
- JWT token harus memiliki expiration time
- Frontend harus handle token refresh atau redirect ke login jika expired

---

## 🧪 Testing

### **Local Development Testing:**

1. **Start Development Server:**
```bash
npm run dev
```

2. **Navigate to Login Page:**
```
http://localhost:3000/login
```

3. **Click "Continue with Google":**
- Should redirect to: `http://103.186.0.127/api/auth/google`
- Then redirect to Google OAuth consent screen

4. **After Authorization:**
- Should redirect to: `http://localhost:3000/auth/google/callback?token=xxx`
- Should save token and redirect to dashboard/onboarding

### **Production Testing:**

1. **Deploy to Vercel**
2. **Set Environment Variable:**
```
BACKEND_API_URL=http://103.186.0.127
```

3. **Test Flow:**
- Visit: `https://your-app.vercel.app/login`
- Click Google button
- Should redirect through proxy: `/api/proxy/api/auth/google`

---

## ⚠️ Backend Requirements

Backend harus implement endpoints berikut:

### **1. GET /api/auth/google**
**Response:** Redirect ke Google OAuth URL
```
Status: 302 Redirect
Location: https://accounts.google.com/o/oauth2/v2/auth?
  client_id=xxx&
  redirect_uri=http://103.186.0.127/api/auth/google/callback&
  response_type=code&
  scope=profile email&
  state=random_state
```

### **2. GET /api/auth/google/callback**
**Parameters:**
- `code`: Authorization code dari Google
- `state`: CSRF token

**Success Response:**
```
Status: 302 Redirect
Location: http://localhost:3000/auth/google/callback?token={JWT_TOKEN}
```

**Error Response:**
```
Status: 302 Redirect
Location: http://localhost:3000/auth/google/callback?error=Authentication+failed
```

### **3. GET /api/user**
**Headers:**
```
Authorization: Bearer {JWT_TOKEN}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@gmail.com",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "age": 25,
    "origin_id": 1,
    "status": "active",
    "origin": "Jakarta"
  }
}
```

---

## 🐛 Troubleshooting

### **Problem: Redirect loop**
**Solution:** Check bahwa backend redirect URL menggunakan domain yang benar (localhost atau Vercel domain)

### **Problem: CORS errors**
**Solution:** Backend harus allow CORS untuk frontend domain

### **Problem: Token tidak tersimpan**
**Solution:** Check console logs, pastikan token ada di query parameters

### **Problem: Mixed content error di production**
**Solution:** Pastikan environment variable `BACKEND_API_URL` sudah diset di Vercel

---

## 📝 Notes

1. **Onboarding Check:** User dianggap complete onboarding jika semua field berikut terisi:
   - `username`
   - `age`
   - `origin_id`
   - `status`
   - `origin`

2. **Automatic Token Handling:** Token otomatis di-attach ke API requests via Axios interceptor di `src/lib/axios.ts`

3. **Error Handling:** Callback page menampilkan loading, success, atau error state dengan auto-redirect

4. **Mobile Responsive:** Button dan callback page fully responsive untuk mobile devices

---

## 🚀 Future Improvements

- [ ] Add loading state pada Google button saat redirect
- [ ] Implement token refresh mechanism
- [ ] Add "Remember Me" functionality
- [ ] Support multiple OAuth providers (Facebook, GitHub, etc.)
- [ ] Add error analytics tracking
- [ ] Implement popup OAuth flow (alternative to redirect)

---

**Last Updated:** October 15, 2025
**Version:** 1.0.0
