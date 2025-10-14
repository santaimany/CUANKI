import { NextResponse } from 'next/server';

// This is a mock endpoint for development/testing
// In production, the client will call backend API directly via axiosInstance
export async function GET() {
  const data = {
    status: "success",
    message: "Hai, santa! ini uang kamu hari ini Rp 0",
    data: {
      user: {
        name: "Ahsanta umbara",
        username: "santa",
        age: 25,
        origin_id: 1,
        origin: "Jakarta",
        status: "Student",
        has_completed_onboarding: true
      },
      daily_budget: {
        amount: 0,
        formatted: "Rp 0",
        kebutuhan_balance: 0,
        days_in_month: 31,
        source: "calculated_from_kebutuhan",
        budget_records_count: 0
      }
    }
  };

  return NextResponse.json(data);
}
