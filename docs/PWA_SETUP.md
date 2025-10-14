# PWA Setup - Cuanki

## ✅ PWA sudah dikonfigurasi!

### Fitur yang sudah diaktifkan:
- ✅ Installable di HP (Android & iOS)
- ✅ Offline support dengan service worker
- ✅ Caching otomatis (fonts, images, API)
- ✅ Splash screen & app icons
- ✅ Standalone mode (full screen seperti native app)
- ✅ App shortcuts (Dashboard, Transaksi, Goals)

## 🚀 Cara Install di HP

### **Android (Chrome/Edge/Samsung Internet):**
1. Buka https://your-app.vercel.app di browser
2. Lihat popup "Tambahkan ke layar beranda" atau klik ⋮ → "Install app"
3. Klik "Install"
4. App akan muncul di home screen

### **iOS (Safari):**
1. Buka https://your-app.vercel.app di Safari
2. Tap tombol Share (📤) di bottom bar
3. Scroll dan tap "Add to Home Screen"
4. Tap "Add"
5. App akan muncul di home screen

## 📱 Bisa di Vercel? **YA!**

PWA **100% bisa jalan di Vercel.app** karena:
- ✅ Tidak butuh App Store atau Play Store
- ✅ Tidak butuh custom domain (vercel.app works!)
- ✅ HTTPS otomatis dari Vercel (requirement untuk PWA)
- ✅ Service worker akan auto-generated saat build

## 🎨 Yang Perlu Anda Lakukan:

### 1. **Buat Icon App** (PENTING!)
Anda perlu membuat icon dengan ukuran berbeda di folder `public/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

**Cara mudah buat icons:**
1. Siapkan logo Cuanki ukuran 512x512px (format PNG, background warna solid #363256)
2. Gunakan tool online:
   - https://realfavicongenerator.net/
   - https://www.pwabuilder.com/imageGenerator
3. Upload logo → Download semua size → Copy ke folder `public/`

### 2. **Update .gitignore**
Tambahkan ke file `.gitignore` Anda:
```
# PWA
**/public/sw.js
**/public/workbox-*.js
**/public/worker-*.js
**/public/sw.js.map
**/public/workbox-*.js.map
**/public/worker-*.js.map
```

### 3. **Build & Deploy**
```bash
npm run build
# Push ke GitHub → Vercel auto-deploy
```

## 🔧 Konfigurasi yang Sudah Dibuat:

### **next.config.ts**
- PWA plugin dengan workbox
- Caching strategy:
  - Fonts: CacheFirst (1 tahun)
  - Images: StaleWhileRevalidate (1 hari)
  - API: NetworkFirst (5 menit)
  - JS/CSS: StaleWhileRevalidate (1 hari)

### **manifest.json**
- App name: "Cuanki - Aplikasi Keuangan Pribadi"
- Theme color: #6F64A7 (purple dari design)
- Background: #363256 (dark purple)
- Display: standalone (full screen)
- Start URL: /dashboard
- Shortcuts: Dashboard, Transaksi, Goals

### **layout.tsx**
- Meta tags untuk iOS & Android
- Apple touch icons
- Theme color
- Viewport optimized untuk mobile

## 🧪 Testing PWA

### **Di Development:**
```bash
npm run build
npm run start
# Buka http://localhost:3000
```

### **Check PWA Score:**
1. Buka DevTools (F12)
2. Tab "Lighthouse"
3. Pilih "Progressive Web App"
4. Klik "Generate report"
5. Target: Score 90+ untuk installable

### **Test di HP:**
1. Deploy ke Vercel
2. Buka di HP browser
3. Pastikan muncul install banner
4. Install dan test offline mode

## 📊 Offline Support

App akan tetap bisa dibuka meskipun offline:
- ✅ Halaman yang sudah pernah dibuka
- ✅ Fonts, images, CSS, JS yang ter-cache
- ⚠️ API calls akan fail (tampilkan error message)

## 🎯 Production Checklist

- [ ] Buat semua icon sizes (72px - 512px)
- [ ] Update manifest.json dengan nama & deskripsi yang tepat
- [ ] Test install di Android Chrome
- [ ] Test install di iOS Safari
- [ ] Lighthouse PWA score > 90
- [ ] Test offline mode
- [ ] Update .gitignore untuk service worker files
- [ ] Deploy ke Vercel

## 🆘 Troubleshooting

**"Install banner tidak muncul"**
- Pastikan HTTPS (Vercel auto HTTPS ✅)
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check manifest.json valid di DevTools → Application → Manifest

**"Icon tidak muncul"**
- Pastikan semua icon files ada di `public/`
- Check file name exact match dengan manifest.json
- Hard refresh browser

**"Offline tidak work"**
- Pastikan sudah build production (`npm run build`)
- Check service worker registered di DevTools → Application → Service Workers
- Development mode disable PWA by default (hanya work di production)

## 📚 Resources

- [Next-PWA Docs](https://github.com/shadowwalker/next-pwa)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [Manifest Spec](https://developer.mozilla.org/en-US/docs/Web/Manifest)
