interface HeaderProps {
  activeView: 'city' | 'dashboard';
  setActiveView: (view: 'city' | 'dashboard') => void;
}

export default function Header({ activeView, setActiveView }: HeaderProps) {
  return (
    <header style={{
      height: '60px',
      background: '#1a1f2e',
      borderBottom: '1px solid #2a3f5f',
      display: 'flex',
      alignItems: 'center',
      padding: '0 2rem'
    }}>
      <h1 style={{ margin: 0, color: '#00ff88', fontSize: '1.5rem' }}>BitNet City3D</h1>
      <nav style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => setActiveView('city')}
          style={{
            background: activeView === 'city' ? '#00ff88' : 'transparent',
            color: activeView === 'city' ? '#0a0f1e' : '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          City
        </button>
        <button
          onClick={() => setActiveView('dashboard')}
          style={{
            background: activeView === 'dashboard' ? '#00ff88' : 'transparent',
            color: activeView === 'dashboard' ? '#0a0f1e' : '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>
      </nav>
    </header>
  );
}
