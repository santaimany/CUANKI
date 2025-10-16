'use client';

import React, { createContext, useContext, useMemo } from 'react';
import toast, { Toaster, ToastPosition } from 'react-hot-toast';

// Toast types for better organization
type ToastType = 'success' | 'error' | 'loading' | 'warning' | 'info';

interface ToastContextType {
  showToast: (message: string, type?: ToastType, options?: any) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showLoading: (message: string) => string;
  showWarning: (message: string) => void;
  showInfo: (message: string) => void;
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
  const showToast = (message: string, type: ToastType = 'info', options?: any) => {
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
  };

  const showSuccess = (message: string) => showToast(message, 'success');
  const showError = (message: string) => showToast(message, 'error');
  const showLoading = (message: string) => showToast(message, 'loading');
  const showWarning = (message: string) => showToast(message, 'warning');
  const showInfo = (message: string) => showToast(message, 'info');
  const dismissToast = (toastId: string) => toast.dismiss(toastId);
  const dismissAll = () => toast.dismiss();

  const value: ToastContextType = useMemo(() => ({
    showToast,
    showSuccess,
    showError,
    showLoading,
    showWarning,
    showInfo,
    dismissToast,
    dismissAll,
  }), []);

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