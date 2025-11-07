import type { TourConfig } from '../types';
import { createNavigateHandler, resolveElement } from '../utils';

export const dashboardHomeTour: TourConfig = {
  id: 'dashboard-home',
  routes: ['/dashboard'],
  autoStart: false,
  steps: [
    {
      element: resolveElement([
        '[data-tour-id="dashboard-welcome-default"]',
      ], 'body'),
      popover: {
        title: 'Selamat Datang di Dashboard CUANKI',
        description: 'Kami bantu kenalin fitur utama supaya kamu bisa langsung mulai mengatur keuanganmu.',
        side: 'over',
        align: 'center',
        showButtons: ['next', 'close'],
        nextBtnText: 'Mulai Tur',
      },
      disableActiveInteraction: true,
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-balance-desktop"]',
        '[data-tour-id="dashboard-balance-tablet"]',
        '[data-tour-id="dashboard-balance-mobile"]',
      ]),
      popover: {
        title: 'Ringkasan Saldo',
        description: 'Pantau total saldo dan buat transaksi baru langsung dari sini.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-goals-desktop"]',
        '[data-tour-id="dashboard-goals-tablet"]',
        '[data-tour-id="dashboard-goals-mobile"]',
      ]),
      popover: {
        title: 'Progress Goals',
        description: 'Lihat perkembangan target tabungan kamu dan kenali apa yang perlu diprioritaskan.',
        side: 'top',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-budget-desktop"]',
        '[data-tour-id="dashboard-budget-tablet"]',
        '[data-tour-id="dashboard-budget-mobile"]',
      ]),
      popover: {
        title: 'Sisa Anggaran',
        description: 'Tracking anggaran bulanan dan pantau apakah kamu masih on-track.',
        side: 'top',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-accounts-desktop"]',
        '[data-tour-id="dashboard-accounts-tablet"]',
        '[data-tour-id="dashboard-accounts-mobile"]',
      ]),
      popover: {
        title: 'Akun Bank',
        description: 'Lihat saldo masing-masing akun dan detail pembagian alokasi dana kamu.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-calendar-desktop"]',
        '[data-tour-id="dashboard-calendar-tablet"]',
        '[data-tour-id="dashboard-calendar-mobile"]',
      ]),
      popover: {
        title: 'Kalender Keuangan',
        description: 'Kalender akan menunjukkan bagaimana aktivitas keuanganmu setiap hari.',
        side: 'top',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-expenses-desktop"]',
        '[data-tour-id="dashboard-expenses-tablet"]',
        '[data-tour-id="dashboard-expenses-mobile"]',
      ]),
      popover: {
        title: 'Ringkasan Pengeluaran',
        description: 'Rangkuman cepat untuk total pengeluaran dan aktivitas yang terjadi hari ini.',
        side: 'left',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-transactions-desktop"]',
        '[data-tour-id="dashboard-transactions-tablet"]',
        '[data-tour-id="dashboard-transactions-mobile"]',
      ]),
      popover: {
        title: 'Riwayat Transaksi',
        description: 'Daftar transaksi terbaru untuk kamu review dan kelola dengan cepat.',
        side: 'left',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-savings-desktop"]',
        '[data-tour-id="dashboard-savings-tablet"]',
        '[data-tour-id="dashboard-savings-mobile"]',
      ]),
      popover: {
        title: 'Grafik Tabungan',
        description: 'Analisis visual untuk progress tabungan dan tren pengeluaranmu.',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="dashboard-profile-desktop"]',
        '[data-tour-id="dashboard-profile-tablet"]',
      ]),
      popover: {
        title: 'Profil & Insight',
        description: 'Dapatkan insight personal dan rekomendasi dari AI mengenai kondisi keuanganmu.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="tour-help-button"]',
      ]),
      popover: {
        title: 'Butuh bantuan lagi?',
        description: 'Kapan pun kamu mau mengulang tour, cukup tekan tombol bantuan ini. Tekan Lanjut buat eksplor halaman Aset secara otomatis.',
        side: 'left',
        align: 'end',
        showButtons: ['next', 'close'],
        nextBtnText: 'Ke Halaman Aset',
        onNextClick: createNavigateHandler('/dashboard/aset', 'dashboard-assets'),
      },
    },
  ],
};
