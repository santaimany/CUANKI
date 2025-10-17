import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Masuk ke Cuanki",
    template: "%s | Cuanki",
  },
  description: "Masuk ke akun Cuanki Anda untuk mengelola keuangan pribadi dengan mudah. Akses budget tracker, tabungan, dan goals keuangan Anda.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Masuk ke Cuanki - Aplikasi Keuangan Pribadi",
    description: "Masuk ke akun Cuanki untuk mengakses fitur lengkap manajemen keuangan pribadi.",
    images: [
      {
        url: "/android/android-launchericon-192-192.png",
        width: 192,
        height: 192,
        alt: "Cuanki Login",
      },
    ],
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}