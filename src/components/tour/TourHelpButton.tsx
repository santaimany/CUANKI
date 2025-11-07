'use client';

import { useCallback, useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { findTourByRoute } from '@/lib/tour/configs';

const TourHelpButton = () => {
  const pathname = usePathname();

  const activeTourId = useMemo(() => {
    if (!pathname) {
      return null;
    }

    const config = findTourByRoute(pathname);
    return config?.id ?? null;
  }, [pathname]);

  const handleClick = useCallback(() => {
    if (!activeTourId || !('window' in globalThis)) {
      return;
    }

    const event = new CustomEvent('cuanki:startTour', {
      detail: { id: activeTourId, force: true },
    });
    globalThis.dispatchEvent?.(event);
  }, [activeTourId]);

  if (!activeTourId) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Mulai ulang tour"
      data-tour-id="tour-help-button"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#5F5BFF] via-[#6F66FF] to-[#0EFF95] text-white shadow-[0_12px_30px_rgba(16,12,48,0.35)] transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#363256] focus-visible:ring-[#A3FFD6]"
    >
      ?
    </button>
  );
};

export default TourHelpButton;
