import type { TourConfig } from '../types';
import { createNavigateHandler, resolveElement } from '../utils';

export const goalsTour: TourConfig = {
  id: 'dashboard-goals',
  routes: ['/dashboard/goals'],
  autoStart: false,
  options: {
    showProgress: true,
    nextBtnText: 'Lanjut',
    prevBtnText: 'Kembali',
    doneBtnText: 'Selesai',
  },
  steps: [
    {
      element: resolveElement([
        '[data-tour-id="goals-header-main"]',
      ]),
      popover: {
        title: 'Ringkasan Goals',
        description: 'Lihat tujuan keuanganmu secara keseluruhan dan progress yang sudah dicapai.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="goals-chart-main"]',
      ]),
      popover: {
        title: 'Grafik Tabungan',
        description: 'Visualisasi perkembangan tabungan dan target keuangan.',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="goals-actions-main"]',
      ]),
      popover: {
        title: 'Tambah Goals Baru',
        description: 'Gunakan tombol ini untuk membuat goals baru atau merencanakan target berikutnya.',
        side: 'top',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="goals-list-main"]',
      ]),
      popover: {
        title: 'Daftar Goals',
        description: 'Kelola setiap goals, update progress, dan tandai goals yang sudah tercapai.',
        side: 'left',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="goals-profile-desktop"]',
      ], '[data-tour-id="goals-reminder-mobile"]'),
      popover: {
        title: 'Profil & Insight',
        description: 'Di desktop tersedia insight personal tambahan untuk bantu kamu fokus pada goals terpenting.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="goals-reminder-desktop"]',
        '[data-tour-id="goals-reminder-mobile"]',
      ]),
      popover: {
        title: 'AI Reminder',
        description: 'Terima rekomendasi otomatis supaya goals kamu tetap on-track.',
        side: 'left',
        align: 'center',
        showButtons: ['next', 'close'],
        nextBtnText: 'Lihat Halaman Badges',
        onNextClick: createNavigateHandler('/dashboard/badges', 'dashboard-badges'),
      },
    },
  ],
};
