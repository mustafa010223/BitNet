interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

export function LoadingState({ message = 'Loading...', size = 'medium' }: LoadingStateProps) {
  const sizeMap = {
    small: { spinner: 24, fontSize: '0.875rem' },
    medium: { spinner: 48, fontSize: '1rem' },
    large: { spinner: 64, fontSize: '1.125rem' },
  };

  const { spinner, fontSize } = sizeMap[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1rem',
      }}
    >
      <div
        style={{
          width: `${spinner}px`,
          height: `${spinner}px`,
          border: '3px solid rgba(0, 255, 136, 0.2)',
          borderTopColor: '#00ff88',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <p style={{ color: '#94a3b8', fontSize, textAlign: 'center' }}>{message}</p>
      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
