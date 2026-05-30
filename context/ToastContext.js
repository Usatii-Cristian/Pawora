'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const COLORS = {
  success: 'text-green-400',
  error: 'text-red-400',
  info: 'text-blue-400',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ message, type = 'success', duration = 3000 }) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {/* Toast container */}
      <div className="fixed bottom-5 right-4 z-[300] flex flex-col gap-2 pointer-events-none w-full max-w-xs">
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || ICONS.success;
          const iconColor = COLORS[toast.type] || COLORS.success;

          return (
            <div
              key={toast.id}
              className="bg-stone-900 text-white text-sm font-medium pl-4 pr-2 py-3 rounded-2xl shadow-2xl flex items-center gap-3 pointer-events-auto animate-slide-in-right"
            >
              <Icon className={`w-4 h-4 ${iconColor} shrink-0`} />
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                onClick={() => dismiss(toast.id)}
                className="p-1.5 text-stone-500 hover:text-white transition-colors rounded-lg hover:bg-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
