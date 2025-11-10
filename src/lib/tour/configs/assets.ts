import type { TourConfig } from '../types';
import { createNavigateHandler, resolveElement } from '../utils';

export const assetsTour: TourConfig = {
  id: 'dashboard-assets',
  routes: ['/dashboard/aset'],
  autoStart: false,
  steps: [
    {
      element: resolveElement([
        '[data-tour-id="assets-summary-main"]',
      ]),
      popover: {
        title: 'Selamat datang di Aset',
        description: 'Disini kamu dapat melihat, membuat, dan mengatur aset pribadi kamu secara keseluruhan.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="assets-list-main"]',
      ]),
      popover: {
        title: 'Detail Aset',
        description: 'Kalo kamu baru buat akun, yuk isi aset kebutuhan kamu biar bisa dapet budget harian. Selain itu, kamu bisa mengatur lebih lanjut aset kamu di bagian ini.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="assets-progress-main"]',
      ]),
      popover: {
        title: 'Progress Tabungan',
        description: 'Pantau progress pencapaian aset utama ataupun target tabungan kamu.',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="assets-profile-desktop"]',
      ], '[data-tour-id="assets-reminder-mobile"]'),
      popover: {
        title: 'Profil & Insight',
        description: 'Insight personal tersedia di panel kanan saat tampilan desktop untuk rekomendasi aset.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="assets-reminder-desktop"]',
        '[data-tour-id="assets-reminder-mobile"]',
      ]),
      popover: {
        title: 'AI Reminder',
        description: 'Dapatkan rekomendasi otomatis dari AI agar aset tetap tumbuh optimal.',
        side: 'left',
        align: 'center',
        showButtons: ['next', 'close'],
        nextBtnText: 'Ke Halaman Goals',
        onNextClick: createNavigateHandler('/dashboard/goals', 'dashboard-goals'),
      },
    },
  ],
};
