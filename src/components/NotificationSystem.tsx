import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export function NotificationSystem() {
  const { notifications, removeNotification } = useAppStore();

  useEffect(() => {
    notifications.forEach((notification) => {
      const timer = setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);

      return () => clearTimeout(timer);
    });
  }, [notifications, removeNotification]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'success':
        return { bg: '#10b981', border: '#059669' };
      case 'error':
        return { bg: '#ef4444', border: '#dc2626' };
      case 'warning':
        return { bg: '#f59e0b', border: '#d97706' };
      case 'info':
        return { bg: '#3b82f6', border: '#2563eb' };
      default:
        return { bg: '#3b82f6', border: '#2563eb' };
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '400px',
      }}
    >
      {notifications.map((notification) => {
        const colors = getColors(notification.type);
        return (
          <div
            key={notification.id}
            style={{
              backgroundColor: 'rgba(22, 33, 62, 0.95)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${colors.border}`,
              borderRadius: '0.5rem',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
              animation: 'slideIn 0.3s ease-out',
            }}
          >
            <div style={{ color: colors.bg, flexShrink: 0 }}>
              {getIcon(notification.type)}
            </div>
            <p style={{ flex: 1, color: '#f8fafc', fontSize: '0.875rem' }}>
              {notification.message}
            </p>
            <button
              onClick={() => removeNotification(notification.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
              }}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
