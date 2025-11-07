import type { TourConfig } from '../types';
import { createNavigateHandler, resolveElement } from '../utils';

export const profileTour: TourConfig = {
  id: 'dashboard-profile',
  routes: ['/dashboard/profile'],
  autoStart: false,
  steps: [
    {
      element: resolveElement([
        '[data-tour-id="profile-header-main"]',
      ]),
      popover: {
        title: 'Profil Singkat',
        description: 'Bagian ini menampilkan identitas utama bersama foto atau inisial kamu.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="profile-details-main"]',
      ]),
      popover: {
        title: 'Detail Data',
        description: 'Semua data personal kamu dikunci read-only agar lebih aman. Hubungi admin bila perlu mengubahnya.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="profile-actions-main"]',
      ]),
      popover: {
        title: 'Aksi Penting',
        description: 'Keluar dari akun atau simpan perubahan rencana keuanganmu dari sini.',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="tour-help-button"]',
      ]),
      popover: {
        title: 'Tour Selesai!',
        description: 'Kalau suatu saat butuh panduan lagi, klik tombol ini. Tekan Lanjut buat kembali ke dashboard utama.',
        side: 'left',
        align: 'end',
        showButtons: ['next', 'close'],
        nextBtnText: 'Kembali ke Dashboard',
        onNextClick: createNavigateHandler('/dashboard'),
      },
    },
  ],
};
