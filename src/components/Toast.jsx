import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      maxWidth: '380px',
      width: '100%'
    }}>
      {toasts.map((toast) => {
        let icon = <Info size={18} color="#38bdf8" />;
        let border = 'rgba(56, 189, 248, 0.4)';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} color="#34d399" />;
          border = 'rgba(52, 211, 153, 0.4)';
        } else if (toast.type === 'warning' || toast.type === 'error') {
          icon = <AlertCircle size={18} color="#f87171" />;
          border = 'rgba(248, 113, 113, 0.4)';
        }

        return (
          <div
            key={toast.id}
            style={{
              background: 'var(--bg-card-solid)',
              border: `1px solid ${border}`,
              borderRadius: 'var(--radius-md)',
              padding: '0.85rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              color: 'var(--text-main)',
              boxShadow: 'var(--shadow-md)',
              fontSize: '0.88rem',
              fontWeight: 500,
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {icon}
            <span style={{ flex: 1 }}>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
