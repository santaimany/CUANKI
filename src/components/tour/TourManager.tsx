'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { usePathname } from 'next/navigation';

import { tourConfigs, findTourByRoute } from '@/lib/tour/configs';
import type { TourConfig } from '@/lib/tour/types';
import type { DriverHook } from 'driver.js';
import { NEXT_TOUR_SESSION_KEY } from '@/lib/tour/utils';

const STORAGE_PREFIX = 'cuanki-tour-completed';

const getStorageKey = (config: TourConfig) => config.storageKey ?? `${STORAGE_PREFIX}-${config.id}`;

const getWindow = () => {
  if (!('window' in globalThis)) {
    return undefined;
  }
  return (globalThis as typeof globalThis & { window: Window }).window;
};

const DEFAULT_OPTIONS = {
  animate: true,
  smoothScroll: true,
  showButtons: ['next', 'previous', 'close'] as const,
  showProgress: true,
  nextBtnText: 'Lanjut',
  prevBtnText: 'Kembali',
  doneBtnText: 'Selesai',
  overlayOpacity: 0.72,
  overlayColor: '#1a1540',
  allowClose: true,
  popoverClass: 'cuanki-tour-popover',
  stagePadding: 16,
  stageRadius: 18,
};

const TourManager = () => {
  const pathname = usePathname();
  const driverRef = useRef<ReturnType<typeof driver> | null>(null);
  const startTimeoutRef = useRef<number | null>(null);

  const startTour = useCallback((config: TourConfig, force: boolean) => {
    const win = getWindow();
    if (!win) {
      return;
    }

    const storageKey = getStorageKey(config);
    if (!force && win.localStorage.getItem(storageKey)) {
      return;
    }

    if (driverRef.current?.isActive()) {
      driverRef.current.destroy();
      driverRef.current = null;
    }

    const originalOnDestroyed = config.options?.onDestroyed;
    const onDestroyed: DriverHook = (element, step, context) => {
      win.localStorage.setItem(storageKey, 'true');
      originalOnDestroyed?.(element, step, context);
    };

    const popoverClassNames = [
      DEFAULT_OPTIONS.popoverClass,
      config.options?.popoverClass,
    ]
      .filter(Boolean)
      .join(' ')
      .trim();

    const baseOptions = {
      ...DEFAULT_OPTIONS,
      ...config.options,
      popoverClass: popoverClassNames || undefined,
      onDestroyed,
      steps: config.steps,
    } as Parameters<typeof driver>[0];

    driverRef.current = driver(baseOptions);
    driverRef.current.drive();
  }, []);

  const activeConfig = useMemo(() => {
    if (!pathname) {
      return undefined;
    }
    return findTourByRoute(pathname);
  }, [pathname]);

  useEffect(() => {
    const win = getWindow();
    if (!win) {
      return () => undefined;
    }

    const handleStart = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string; force?: boolean }>;
      const config = tourConfigs[customEvent.detail.id];
      if (!config) {
        console.warn(`🚧 Tour with id "${customEvent.detail.id}" not found.`);
        return;
      }
      startTour(config, customEvent.detail.force ?? false);
    };

    const handleReset = (event: Event) => {
      const customEvent = event as CustomEvent<{ id: string }>;
      const config = tourConfigs[customEvent.detail.id];
      if (!config) {
        return;
      }
      win.localStorage.removeItem(getStorageKey(config));
    };

    win.addEventListener('cuanki:startTour', handleStart as EventListener);
    win.addEventListener('cuanki:resetTour', handleReset as EventListener);

    return () => {
      win.removeEventListener('cuanki:startTour', handleStart as EventListener);
      win.removeEventListener('cuanki:resetTour', handleReset as EventListener);
    };
  }, [startTour]);

  useEffect(() => {
    const win = getWindow();
    if (!activeConfig || !win) {
      return undefined;
    }

    const queuedTour = win.sessionStorage.getItem(NEXT_TOUR_SESSION_KEY);
    if (queuedTour === activeConfig.id) {
      win.sessionStorage.removeItem(NEXT_TOUR_SESSION_KEY);
      startTour(activeConfig, true);

      return () => {
        if (driverRef.current?.isActive()) {
          driverRef.current.destroy();
          driverRef.current = null;
        }
      };
    }

    const storageKey = getStorageKey(activeConfig);
    const alreadyCompleted = win.localStorage.getItem(storageKey);

    if (alreadyCompleted && activeConfig.autoStart !== false) {
      return undefined;
    }

    if (activeConfig.autoStart === false) {
      return undefined;
    }

    const delay = activeConfig.autoStartDelay ?? 1000;
    startTimeoutRef.current = win.setTimeout(() => {
      startTour(activeConfig, false);
    }, delay);

    return () => {
      if (startTimeoutRef.current) {
        win.clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = null;
      }
      if (driverRef.current?.isActive()) {
        driverRef.current.destroy();
        driverRef.current = null;
      }
    };
  }, [activeConfig, startTour]);

  return null;
};

export default TourManager;
