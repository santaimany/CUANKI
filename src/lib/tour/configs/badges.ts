import type { TourConfig } from '../types';
import { createNavigateHandler, resolveElement } from '../utils';

export const badgesTour: TourConfig = {
  id: 'dashboard-badges',
  routes: ['/dashboard/badges'],
  autoStart: false,
  steps: [
    {
      element: resolveElement([
        '[data-tour-id="badges-header-main"]',
      ]),
      popover: {
        title: 'Pencapaian Utama',
        description: 'Lihat badge unggulan yang baru kamu raih dan milestone terdekat yang bisa dikejar.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="badges-list-main"]',
      ]),
      popover: {
        title: 'Koleksi Badge',
        description: 'Pantau seluruh badge beserta progress-nya. Gunakan tombol refresh untuk ambil update terbaru.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="badges-profile-desktop"]',
      ], '[data-tour-id="badges-list-main"]'),
      popover: {
        title: 'Insight Personal',
        description: 'Di desktop kamu akan lihat insight profil yang relevan dengan perjalanan badge kamu.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="badges-reminder-desktop"]',
        '[data-tour-id="badges-reminder-mobile"]',
      ]),
      popover: {
        title: 'AI Reminder',
        description: 'Aktifkan reminder untuk dapetin tips personal. Tekan Lanjut buat lompat ke halaman Transaksi.',
        side: 'left',
        align: 'center',
        showButtons: ['next', 'close'],
        nextBtnText: 'Ke Halaman Transaksi',
        onNextClick: createNavigateHandler('/dashboard/transaksi', 'dashboard-transactions'),
      },
    },
  ],
};
