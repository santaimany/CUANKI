'use client';

import React, { createContext, useContext, useMemo, useCallback } from 'react';
import toast, { Toaster, ToastPosition, type ToastOptions } from 'react-hot-toast';

// Toast types for better organization
type ToastType = 'success' | 'error' | 'loading' | 'warning' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: ToastOptions) => string | undefined;
  showSuccess: (message: string) => string | undefined;
  showError: (message: string) => string | undefined;
  showLoading: (message: string) => string | undefined;
  showWarning: (message: string) => string | undefined;
  showInfo: (message: string) => string | undefined;
  dismissToast: (toastId: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  position = 'top-center' 
}) => {
  // Duplicate prevention untuk toast yang sama
  const recentToasts = React.useRef<Map<string, number>>(new Map());
  const DUPLICATE_THRESHOLD = 3000; // 3 detik

  const showToast = useCallback((message: string, type: ToastType = 'info', options?: ToastOptions) => {
    // Check untuk duplicate toast
    const key = `${type}-${message}`;
    const now = Date.now();
    const lastShown = recentToasts.current.get(key);
    
    if (lastShown && now - lastShown < DUPLICATE_THRESHOLD) {
      return; // Skip duplicate toast
    }
    
    recentToasts.current.set(key, now);
    const toastOptions = {
      duration: 4000,
      style: {
        background: '#363256',
        color: '#fff',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '14px',
        fontWeight: '500',
        maxWidth: '400px',
        ...options?.style,
      },
      ...options,
    };

    switch (type) {
      case 'success':
        return toast.success(message, {
          ...toastOptions,
          style: {
            ...toastOptions.style,
            background: '#00F5A0',
            color: '#363256',
          },
          iconTheme: {
            primary: '#363256',
            secondary: '#00F5A0',
          },
        });
      case 'error':
        return toast.error(message, {
          ...toastOptions,
          style: {
            ...toastOptions.style,
            background: '#EF4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#EF4444',
          },
        });
      case 'loading':
        return toast.loading(message, {
          ...toastOptions,
          style: {
            ...toastOptions.style,
            background: '#5B4E96',
            color: '#fff',
          },
        });
      case 'warning':
        return toast(message, {
          ...toastOptions,
          icon: '⚠️',
          style: {
            ...toastOptions.style,
            background: '#F59E0B',
            color: '#fff',
          },
        });
      case 'info':
      default:
        return toast(message, {
          ...toastOptions,
          icon: 'ℹ️',
          style: {
            ...toastOptions.style,
            background: '#3B82F6',
            color: '#fff',
          },
        });
    }
  }, []);

  const value: ToastContextType = useMemo(() => ({
    showToast,
    showSuccess: (message: string) => showToast(message, 'success'),
    showError: (message: string) => showToast(message, 'error'),
    showLoading: (message: string) => showToast(message, 'loading'),
    showWarning: (message: string) => showToast(message, 'warning'),
    showInfo: (message: string) => showToast(message, 'info'),
    dismissToast: (toastId: string) => toast.dismiss(toastId),
    dismissAll: () => toast.dismiss(),
  }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster
        position={position}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363256',
            color: '#fff',
          },
        }}
      />
    </ToastContext.Provider>
  );
};