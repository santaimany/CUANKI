# Integrasi API Aset - Summary

## Overview
Mengintegrasikan API `/api/update-account-balance` dan `/api/user-accounts` ke halaman Aset untuk menampilkan dan mengedit saldo akun secara real-time.

## API Endpoints Terintegrasi

### 1. GET `/api/user-accounts`
- **Response:**
```json
{
  "status": "success",
  "data": {
    "accounts": [
      {
        "account_id": 1,
        "account_name": "BCA",
        "type": "Kebutuhan",
        "balance": "3500000",
        "formatted_balance": "Rp 3.500.000"
      }
    ],
    "total_options": 4
  }
}
```

### 2. POST `/api/update-account-balance`
- **Request:**
```json
{
  "account_id": 1,
  "type": "Kebutuhan",
  "balance_per_type": 3500000
}
```
- **Response:**
```json
{
  "account_id": 1,
  "type": "Kebutuhan",
  "balance_per_type": 3500000
}
```

## File Changes

### 1. **Types** (`src/types/api.ts`)
✅ Ditambahkan interface:
- `UpdateAccountBalanceRequest`
- `UpdateAccountBalanceResponse`

### 2. **API Client** (`src/lib/api/user.ts`)
✅ Ditambahkan function:
- `updateAccountBalance()` - POST untuk update saldo akun

### 3. **Komponen Baru**
✅ **EditAccountModal** (`src/components/dashboard/aset/EditAccountModal.tsx`)
- Modal untuk edit saldo akun
- Form input dengan format Rupiah
- Loading state dan error handling
- Validation sebelum submit

### 4. **Komponen Diupdate**

#### **AssetCards** (`src/components/dashboard/aset/AssetCards.tsx`)
✅ Changes:
- Fetch data dari `getUserAccounts()` API
- Menampilkan data real-time (account_name, type, formatted_balance)
- Click handler untuk membuka modal edit
- Loading skeleton saat fetch data
- Color mapping berdasarkan tipe akun:
  - Kebutuhan: `#00F5A0` (Green)
  - Tabungan: `#00D9D9` (Cyan)
  - Darurat: `#7BFFC7` (Light Green)
  - Default: `#4DD4AC` (Teal)
- Hover effect dengan icon edit
- Integrasi dengan EditAccountModal
- Auto refresh setelah update berhasil

#### **AssetSummary** (`src/components/dashboard/aset/AssetSummary.tsx`)
✅ Changes:
- Menerima array `accounts` dari API
- Menghitung total amount secara dinamis
- Generate pie chart data dari akun yang ada
- Tooltip menampilkan detail per akun
- Fallback UI jika tidak ada data

#### **Aset Page** (`src/app/(dashboard)/dashboard/aset/page.tsx`)
✅ Changes:
- State management untuk accounts
- Callback `onAccountsChange` untuk update data
- Pass accounts ke AssetSummary untuk pie chart
- Pass callback ke AssetCards untuk sinkronisasi data

## Fitur Utama

### 1. **View Accounts**
- Menampilkan semua akun dari API
- Card view dengan nama akun dan tipe
- Format saldo dalam Rupiah
- Color coding berdasarkan tipe akun
- Pagination untuk 4 akun per halaman
- Loading skeleton saat fetch

### 2. **Edit Account Balance**
- Click pada card untuk edit
- Modal dengan info akun saat ini
- Input saldo baru dengan format Rupiah otomatis
- Validasi input (hanya angka)
- Loading state saat save
- Error handling dan pesan error
- Auto refresh data setelah berhasil

### 3. **Asset Summary**
- Pie chart dinamis berdasarkan data akun
- Total amount dihitung otomatis
- Tooltip dengan detail per akun
- Responsive design

## User Flow

1. **View Accounts:**
   - User membuka page Aset
   - AssetCards fetch data dari API
   - Tampilkan loading skeleton
   - Render cards dengan data real

2. **Edit Balance:**
   - User click pada card akun
   - Modal muncul dengan info akun
   - User input saldo baru
   - Click Simpan
   - API call untuk update
   - Loading indicator
   - Modal close
   - Data auto refresh
   - Pie chart & total amount update

3. **View Summary:**
   - AssetSummary menerima updated accounts
   - Recalculate total amount
   - Regenerate pie chart
   - Display updated data

## Error Handling

1. **Fetch Accounts:**
   - Try-catch block
   - Console.error untuk debugging
   - UI tetap render (empty state)

2. **Update Balance:**
   - Try-catch block
   - Error message di modal
   - Button disabled saat loading
   - Prevent multiple submits

## Accessibility Features

- Keyboard navigation support (Enter, Space key)
- ARIA roles untuk interactive elements
- Tab index untuk fokus management
- Label associations untuk form inputs
- Disabled states untuk buttons
- Loading indicators untuk visual feedback

## Color Scheme

Account type colors:
- **Kebutuhan**: `#00F5A0` (Bright Green)
- **Tabungan**: `#00D9D9` (Cyan)
- **Darurat**: `#7BFFC7` (Light Green)
- **Default**: `#4DD4AC` (Teal)

Pie chart: Menggunakan gradient dari colors di atas

## Responsive Design

- Grid layout: 1 col (mobile) → 2 cols (tablet) → 4 cols (desktop)
- Text sizes: text-base → text-lg → text-xl → text-2xl
- Padding: p-3 → p-4 → p-6
- Modal: max-w-md, full width di mobile

## Performance Optimizations

1. **Data Fetching:**
   - Fetch hanya saat component mount
   - useEffect dengan empty dependency array
   - Callback pattern untuk update parent state

2. **Rendering:**
   - Loading skeleton untuk better UX
   - Conditional rendering berdasarkan state
   - Key props untuk efisien re-rendering

3. **User Experience:**
   - Optimistic UI tidak perlu (data fresh dari server)
   - Auto format Rupiah saat input
   - Instant feedback untuk interactions

## Testing Recommendations

1. **Unit Tests:**
   - API client functions
   - Format currency helper
   - Color mapping logic

2. **Integration Tests:**
   - Fetch accounts flow
   - Update balance flow
   - Modal open/close
   - Data synchronization

3. **E2E Tests:**
   - Complete user flow
   - Error scenarios
   - Network failures

## Future Enhancements

1. **Add Account:**
   - Modal untuk tambah akun baru
   - API endpoint untuk create account

2. **Delete Account:**
   - Confirmation dialog
   - API endpoint untuk delete account

3. **Account History:**
   - List perubahan saldo
   - Timeline view

4. **Bulk Operations:**
   - Select multiple accounts
   - Batch update

5. **Export Data:**
   - Export ke CSV/Excel
   - Print friendly view
