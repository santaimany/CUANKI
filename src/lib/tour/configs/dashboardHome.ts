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
        title: 'Budget harian kamu',
        description: 'Kenapa sih kok kamu butuh ngerti budget harian kamu, karena dengan adanya budget harian maka kamu dapat mengerti batasan dalam mengeluarkan uang kamu sehari. Budget ini otomatis kamu dapatkan dari pembagian antara dana kebutuhan kamu dibagi dengan sisa hari dalam bulan.',
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
        title: 'Goal Progress Kamu',
        description: 'Kenapa sih cuanki tampilin progress goal kamu, karena cuanki ingin menanamkan habbit dan konsistensi kamu dalam menabung demi goals impian kamu.',
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
        title: 'Budget Sisa Kamu',
        description: 'Untuk apa nih budget sisa?jadi cuanki menyediakan budget sisa agar kamu tau budget kemarin ada sisa atau engga, sehingga kamu tau kamu bisa self-reward jika ada sisa, hehe.',
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
        title: 'Aset Kamu',
        description: 'disini kita belajar bagaimana pentingnya mengkategorikan aset kamu agar ter manage dengan sempurna dan cuanki membantu kamu untuk memisahkannya secara otomatis.',
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
        title: 'Kalender Cuanki',
        description: 'Dengan adanya kalender ini kamu diminta belajar untuk mengingat hari dimana kamu on budget(hijau) atau over budget(merah).',
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
        description: 'Kenapa kok ada grafik tabungan?Cuanki ingin kamu belajar menabung dengan rajin, dan dengan grafik ini kamu tahu naik turunnya tabungan kamu.',
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
        title: 'Cuanki Streak',
        description: 'Dengan adanya fitur ini cuanki ingin kamu selalu semangat dalam belajar dan mencatat keuangan kamu.',
        side: 'top',
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
