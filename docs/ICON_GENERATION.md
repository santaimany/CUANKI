# Icon Generation Guide

## Quick Start - Generate All Icons

Gunakan salah satu tool online ini untuk generate semua size icon sekaligus:

### **Option 1: PWA Builder (Recommended)**
1. Buka: https://www.pwabuilder.com/imageGenerator
2. Upload logo Cuanki (512x512px PNG)
3. Pilih platform: "All"
4. Download ZIP
5. Extract semua file ke folder `public/`

### **Option 2: Real Favicon Generator**
1. Buka: https://realfavicongenerator.net/
2. Upload logo Cuanki
3. Configure iOS, Android settings
4. Download package
5. Copy semua PNG files ke `public/`

### **Option 3: Favicon.io**
1. Buka: https://favicon.io/favicon-converter/
2. Upload image 512x512px
3. Download
4. Rename files sesuai manifest.json
5. Copy ke `public/`

## Icon Requirements

Buat icon dengan specs:
- **Format**: PNG with transparency
- **Background**: Solid color (#363256) or transparent
- **Logo**: Centered, padding 10-15% dari edge
- **Colors**: Primary #00F5A0, Secondary #6F64A7

## Sizes Needed

```
✅ icon-72x72.png    (Android)
✅ icon-96x96.png    (Android)
✅ icon-128x128.png  (Android)
✅ icon-144x144.png  (Android, Windows)
✅ icon-152x152.png  (iOS)
✅ icon-192x192.png  (Android, iOS)
✅ icon-384x384.png  (Android)
✅ icon-512x512.png  (Android, Splash)
```

## Manual Creation (Photoshop/Figma)

1. Buat artboard 512x512px
2. Background: #363256
3. Add logo/text centered
4. Export sebagai PNG
5. Resize ke semua size yang diperlukan
6. Save dengan naming convention: `icon-{size}.png`

## Template SVG

File `icon-template.svg` sudah disediakan sebagai starting point.
Edit dengan Figma/Illustrator, lalu export ke PNG.

## Verification

Setelah upload icons, check:
1. DevTools → Application → Manifest
2. Pastikan semua icons muncul
3. Test install di HP, lihat icon di home screen
