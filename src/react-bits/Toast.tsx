"use client";

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; // Ensure this path is correct or replace with a local helper
import { X, CheckCircle, AlertCircle } from 'lucide-react';

export interface ToastProps {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  onDismiss: (id: string) => void;
}

export function Toast({ id, title, description, type = 'info', onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onDismiss]);

  return (
    <div className={cn(
      "pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-zinc-800 border shadow-lg ring-1 ring-black/5 transition-all animate-in slide-in-from-right-full fade-in duration-300",
      type === 'success' && "border-green-500/50",
      type === 'error' && "border-red-500/50"
    )}>
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {type === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
            {type === 'error' && <AlertCircle className="h-5 w-5 text-red-500" />}
            {type === 'info' && <AlertCircle className="h-5 w-5 text-blue-500" />}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{title}</p>
            {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => onDismiss(id)}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define the interface for the window object extension
interface WindowWithToast extends Window {
  toast?: (toast: Omit<ToastProps, 'id' | 'onDismiss'>) => void;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onDismiss'>[]>([]);

  const addToast = (toast: Omit<ToastProps, 'id' | 'onDismiss'>) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    (window as unknown as WindowWithToast).toast = addToast;
  }, []);

  return (
    <>
      {children}
      <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 sm:p-6 w-full max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onDismiss={removeToast} />
        ))}
      </div>
    </>
  );
}

export const toast = (props: Omit<ToastProps, 'id' | 'onDismiss'>) => {
  if (typeof window !== 'undefined' && (window as unknown as WindowWithToast).toast) {
    (window as unknown as WindowWithToast).toast!(props);
  } else {
    console.log("Toast:", props);
  }
};
