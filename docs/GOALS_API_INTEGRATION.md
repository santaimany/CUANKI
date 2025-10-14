# Integrasi API Goals Progress - Summary

## Overview
Mengintegrasikan API `/api/goals-progress` ke halaman Goals dan komponen terkait untuk menampilkan data goals, finance plan, dan progress secara real-time.

## API Endpoint

### GET `/api/goals-progress`
**Response Structure:**
```json
{
  "status": "success",
  "data": {
    "main_saving_target": {
      "amount": 96000000,
      "current_amount": 0,
      "progress_percentage": 0,
      "formatted_amount": "Rp 96.000.000",
      "formatted_current": "Rp 0"
    },
    "finance_plan": {
      "monthly_income": "5000000.00",
      "income_date": 1,
      "monthly_saving_target": "2000000.00",
      "saving_target_duration_years": 4,
      "saving_target_duration_months": 48,
      "total_saving_target": 96000000,
      "emergency_target_amount": null,
      "formatted": {
        "monthly_income": "Rp 5.000.000",
        "monthly_saving_target": "Rp 2.000.000",
        "saving_target_duration": "4 tahun (48 bulan)",
        "total_saving_target": "Rp 96.000.000",
        "emergency_target_amount": "Rp 0"
      }
    },
    "goals": [
      {
        "type": "saving",
        "goal_name": "Target Tabungan Utama",
        "target_amount": 96000000,
        "current_amount": 0,
        "remaining_amount": 96000000,
        "progress_percentage": 0,
        "target_duration_years": 4,
        "target_duration_months": 48,
        "target_date": "2029-10-14",
        "days_remaining": 1460.99,
        "monthly_saving_needed": 2000000,
        "is_completed": false,
        "formatted": {
          "target_amount": "Rp 96.000.000",
          "current_amount": "Rp 0",
          "remaining_amount": "Rp 96.000.000",
          "progress_percentage": "0%",
          "monthly_saving_needed": "Rp 2.000.000",
          "target_date": "14 Oct 2029",
          "days_remaining": "1460.99 hari lagi"
        }
      },
      {
        "type": "emergency",
        "goal_name": "Dana Darurat",
        "target_amount": null,
        "current_amount": 100000,
        "remaining_amount": 0,
        "progress_percentage": 0,
        "is_completed": true,
        "formatted": {
          "target_amount": "Rp 0",
          "current_amount": "Rp 100.000",
          "remaining_amount": "Rp 0",
          "progress_percentage": "0%"
        }
      }
    ],
    "summary": {
      "total_goals": 2,
      "completed_goals": 1,
      "total_target_amount": 96000000,
      "total_current_amount": 100000,
      "overall_progress": 0.1,
      "formatted": {
        "total_target_amount": "Rp 96.000.000",
        "total_current_amount": "Rp 100.000",
        "overall_progress": "0.1%"
      }
    }
  }
}
```

## Komponen yang Diintegrasikan

### 1. **Goals Page** (`src/app/(dashboard)/dashboard/goals/page.tsx`)
✅ **Changes:**
- Added `useState` dan `useEffect` untuk fetch data
- Fetch `getGoalsProgress()` saat mount
- Loading state untuk UX yang lebih baik
- Pass data ke child components:
  - `GoalHeader` - main saving target data
  - `GoalList` - array of goals
  - `SavingsChart` - optional goals data

### 2. **GoalHeader Component** (`src/components/dashboard/goals/GoalHeader.tsx`)
✅ **Changes:**
- Added props: `formattedCurrent` dan `formattedTarget`
- Menggunakan formatted values dari API
- Safe calculation untuk percentage (prevent division by zero)
- Display format:
  - Formatted values jika ada
  - Fallback ke format manual jika tidak ada

**Props Interface:**
```typescript
interface GoalHeaderProps {
  goalName: string;
  currentAmount: number;
  targetAmount: number;
  formattedCurrent?: string;
  formattedTarget?: string;
}
```

### 3. **GoalList Component** (`src/components/dashboard/goals/GoalList.tsx`)
✅ **Major Changes:**
- Changed from custom interface ke `Goal` type dari API
- Dynamic icon berdasarkan goal type:
  - `saving` - Kendaraan icon
  - `emergency` - Shield/Play icon
- Display data dari API:
  - `goal_name` - Nama goal
  - `target_date` - Tanggal target (formatted)
  - `current_amount` - Jumlah saat ini
  - `target_amount` - Target amount
  - `progress_percentage` - Progress bar
- Additional info untuk saving goals:
  - Monthly saving needed
  - Days remaining
- Empty state jika tidak ada goals

**Data Mapping:**
```
API Field          → Display
-----------------------------------
goal_name          → Goal title
type               → Icon selection
current_amount     → Current progress
target_amount      → Target value
progress_percentage → Progress bar width
target_date        → Target deadline
monthly_saving_needed → Monthly info
days_remaining     → Time left info
```

### 4. **SavingsChart Component** (`src/components/dashboard/SavingsChart.tsx`)
✅ **Changes:**
- Added optional `goalsData` prop
- Extract values untuk potential future use:
  - `currentAmount`
  - `targetAmount`
  - `monthlySavingTarget`
- Saat ini masih menggunakan mock data untuk chart
- Siap untuk integrasi data historis dari backend

**Props Interface:**
```typescript
interface SavingsChartProps {
  goalsData?: GoalsProgressResponse | null;
}
```

## Features Implemented

### 1. **Main Goal Progress**
- Display main saving target dengan progress bar
- Format currency otomatis (Rp formatted)
- Percentage calculation
- Edit button (UI ready)

### 2. **Goal List Display**
- Multiple goals support
- Type-based icons (saving vs emergency)
- Progress bars per goal
- Formatted amounts dan dates
- Additional info untuk saving goals:
  - Berapa harus nabung per bulan
  - Sisa hari untuk mencapai target

### 3. **Loading States**
- Loading indicator saat fetch
- Skeleton/placeholder untuk UX
- Error handling

### 4. **Empty States**
- "Belum ada goals" message
- Centered display

## Data Flow

```
Goals Page (Container)
    ↓
Fetch getGoalsProgress()
    ↓
Update State: goalsData
    ↓
Pass to Components:
    ├─→ GoalHeader (main_saving_target)
    ├─→ GoalList (goals array)
    └─→ SavingsChart (full goalsData)
```

## Goal Types

### Type: "saving"
- Main saving goals
- Has target amount & date
- Shows monthly saving needed
- Shows days remaining
- Progress tracked

### Type: "emergency"
- Emergency fund
- May not have target amount
- Progress based on current amount
- Can be marked as completed

## Response Data Usage

### main_saving_target
Used in: **GoalHeader**
- `amount` → Target amount
- `current_amount` → Current progress
- `progress_percentage` → Progress bar
- `formatted_amount` → Display target
- `formatted_current` → Display current

### finance_plan
Used in: **GoalHeader** (goalName)
- `formatted.saving_target_duration` → Goal title
- Other fields: Available for future features

### goals[]
Used in: **GoalList**
- `type` → Icon & behavior
- `goal_name` → Title
- `target_amount` → Target value
- `current_amount` → Current value
- `progress_percentage` → Progress bar
- `target_date` → Deadline
- `monthly_saving_needed` → Monthly info
- `days_remaining` → Time info
- `formatted.*` → All display values

### summary
Used in: **Future dashboard widgets**
- `total_goals` → Goals count
- `completed_goals` → Completion count
- `total_target_amount` → Total targets
- `total_current_amount` → Total saved
- `overall_progress` → Overall percentage

## Future Enhancements

### 1. **Historical Chart Data**
- Backend endpoint untuk historical progress
- Chart menampilkan progress over time
- Monthly/weekly views

### 2. **Edit Goal**
- Modal untuk edit goal
- Update target amount
- Update target date
- API endpoint: PUT/PATCH `/api/goals/{id}`

### 3. **Add/Delete Goals**
- Modal form untuk create goal
- Delete confirmation dialog
- API endpoints:
  - POST `/api/goals` (create)
  - DELETE `/api/goals/{id}` (delete)

### 4. **Goal Achievements**
- Badges untuk completed goals
- Milestone celebrations
- Progress notifications

### 5. **Dashboard Summary Widget**
- Use `summary` data
- Overall progress pie chart
- Completion rate

### 6. **Goal Categories**
- Custom categories beyond saving/emergency
- Category-specific icons
- Filter by category

## Testing Checklist

- [x] Fetch data dari API
- [x] Display main goal dengan progress
- [x] Display list of goals
- [x] Loading states
- [x] Empty states
- [x] Formatted currency display
- [x] Progress bar animations
- [x] Responsive layout
- [ ] Error handling untuk failed API calls
- [ ] Refresh data setelah edit (when implemented)

## Known Limitations

1. **SavingsChart** - Masih menggunakan mock data, belum terintegrasi penuh dengan API data
2. **Edit Buttons** - UI ada tapi belum ada functionality
3. **Add/Delete** - Buttons ready tapi belum ada modal/functionality
4. **No Refresh** - Setelah edit, perlu manual refresh (karena edit belum implemented)

## API Client Function

Function sudah ada di `src/lib/api/user.ts`:
```typescript
export async function getGoalsProgress(): Promise<GoalsProgressResponse>
```

## Type Definitions

Semua types sudah ada di `src/types/api.ts`:
- `GoalsProgressResponse`
- `MainSavingTarget`
- `FinancePlan`
- `Goal`
- `GoalsSummary`

## Responsive Design

Semua komponen sudah responsive:
- Mobile: Stack vertical
- Tablet: 2 columns
- Desktop: Grid layout dengan sidebar
- Text sizes: Adaptive (sm → md → lg → xl)
- Padding/spacing: Responsive

## Performance Notes

- Single API call per page load
- Data cached dalam component state
- No unnecessary re-renders
- Efficient list rendering dengan proper keys
