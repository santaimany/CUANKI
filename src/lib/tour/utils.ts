import type { DriveStep, DriverHook } from 'driver.js';

const getWindow = (): Window | undefined => {
  if (typeof globalThis !== 'object' || !('window' in globalThis)) {
    return undefined;
  }

  const { window: win } = globalThis as typeof globalThis & { window?: Window };
  return win;
};

export const NEXT_TOUR_SESSION_KEY = 'cuanki-tour-next-target';

const isVisible = (element: Element | null): element is HTMLElement => {
  if (!element) {
    return false;
  }

  const htmlElement = element as HTMLElement;
  const style = getComputedStyle(htmlElement);

  if (style.visibility === 'hidden' || style.display === 'none') {
    return false;
  }

  if (style.position === 'fixed') {
    return htmlElement.offsetWidth > 0 && htmlElement.offsetHeight > 0;
  }

  return !!htmlElement.offsetParent;
};

export const resolveElement = (selectors: string[], fallbackSelector = 'body'): (() => Element) => {
  return () => {
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (isVisible(element)) {
        return element;
      }
    }

    const fallback = document.querySelector(fallbackSelector) ?? document.body;
    return fallback;
  };
};

export const withPopover = (step: DriveStep, popover: DriveStep['popover']): DriveStep => ({
  ...step,
  popover: {
    showButtons: ['next', 'previous', 'close'],
    ...step.popover,
    ...popover,
  },
});

export const queueNextTour = (tourId?: string) => {
  const win = getWindow();
  if (!win) {
    return;
  }

  if (tourId) {
    win.sessionStorage.setItem(NEXT_TOUR_SESSION_KEY, tourId);
  } else {
    win.sessionStorage.removeItem(NEXT_TOUR_SESSION_KEY);
  }
};

export const createNavigateHandler = (route: string, nextTourId?: string): DriverHook => {
  return (_element, _step, { driver }) => {
    const win = getWindow();
    if (!win) {
      return;
    }

    queueNextTour(nextTourId);
    driver.destroy();

    win.setTimeout(() => {
      win.location.assign(route);
    }, 240);
  };
};
