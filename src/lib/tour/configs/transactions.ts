import type { TourConfig } from '../types';
import { createNavigateHandler, resolveElement } from '../utils';

export const transactionsTour: TourConfig = {
  id: 'dashboard-transactions',
  routes: ['/dashboard/transaksi'],
  autoStart: false,
  steps: [
    {
      element: resolveElement([
        '[data-tour-id="transactions-summary-main"]',
      ]),
      popover: {
        title: 'Ringkasan Harian',
        description: 'Cek total pemasukan dan pengeluaran harian serta refresh untuk update transaksi terbaru.',
        side: 'bottom',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="transactions-tabs-main"]',
      ]),
      popover: {
        title: 'Filter Jenis Transaksi',
        description: 'Gunakan tab ini untuk pindah antara pengeluaran dan pemasukan sebelum melihat detailnya.',
        side: 'bottom',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="transactions-search-main"]',
      ]),
      popover: {
        title: 'Cari & Saring',
        description: 'Ketik kata kunci atau gunakan filter supaya transaksi spesifik mudah ditemukan.',
        side: 'bottom',
        align: 'end',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="transactions-list-main"]',
      ]),
      popover: {
        title: 'Daftar Transaksi',
        description: 'Semua transaksi ditampilkan di sini lengkap dengan aksi cepat untuk edit atau hapus.',
        side: 'left',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="transactions-profile-desktop"]',
      ], '[data-tour-id="transactions-monthly-mobile"]'),
      popover: {
        title: 'Insight Pengguna',
        description: 'Di desktop kamu bisa lihat profil singkat sekaligus insight personal di panel kanan.',
        side: 'left',
        align: 'start',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="transactions-monthly-desktop"]',
        '[data-tour-id="transactions-monthly-mobile"]',
      ]),
      popover: {
        title: 'Summary Bulanan',
        description: 'Pantau performa bulanan kamu dalam sekali lihat, tersedia di desktop dan mobile.',
        side: 'top',
        align: 'center',
      },
    },
    {
      element: resolveElement([
        '[data-tour-id="transactions-reminder-desktop"]',
        '[data-tour-id="transactions-reminder-mobile"]',
      ]),
      popover: {
        title: 'AI Reminder',
        description: 'Aktifkan reminder supaya transaksi penting tidak kelewat. Tekan Lanjut untuk kembali ke dashboard utama.',
        side: 'left',
        align: 'center',
        showButtons: ['next', 'close'],
        nextBtnText: 'Kembali ke Dashboard',
        onNextClick: createNavigateHandler('/dashboard'),
      },
    },
  ],
};
