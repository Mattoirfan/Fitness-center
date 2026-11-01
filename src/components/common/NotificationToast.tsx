import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const icon = {
          success: <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-[#FF5E3A] shrink-0" />,
          info: <Info className="w-5 h-5 text-[#00F0FF] shrink-0" />
        }[toast.type];

        const borderColor = {
          success: 'border-[#10B981]/50 bg-[#131B2E]/95',
          error: 'border-[#FF5E3A]/50 bg-[#131B2E]/95',
          info: 'border-[#00F0FF]/50 bg-[#131B2E]/95'
        }[toast.type];

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start justify-between gap-3 p-4 rounded-xl backdrop-blur-md border ${borderColor} shadow-2xl text-white text-xs sm:text-sm animate-in fade-in slide-in-from-bottom-2 duration-200`}
          >
            <div className="flex items-start gap-2.5">
              {icon}
              <p className="leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-[#94A3B8] hover:text-white p-0.5 rounded focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
