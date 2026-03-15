import { useAppStore } from '../store/appStore';
import { X, Users, Zap, TrendingUp, Calendar } from 'lucide-react';

export function BuildingInfoPanel() {
  const { selectedBuilding, selectBuilding } = useAppStore();

  if (!selectedBuilding) return null;

  const { metadata } = selectedBuilding;

  return (
    <div
      style={{
        position: 'absolute',
        top: '5rem',
        right: '1.5rem',
        width: '320px',
        backgroundColor: 'rgba(22, 33, 62, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '0.75rem',
        border: '1px solid rgba(0, 255, 136, 0.3)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        animation: 'slideInRight 0.3s ease-out',
      }}
    >
      <div
        style={{
          padding: '1rem',
          borderBottom: '1px solid rgba(0, 255, 136, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#00ff88' }}>
          {metadata?.name || 'Building Details'}
        </h3>
        <button
          onClick={() => selectBuilding(null)}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
          }}
          aria-label="Close panel"
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ padding: '1rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: '#64748b',
                textTransform: 'uppercase',
                marginBottom: '0.25rem',
              }}
            >
              Type
            </div>
            <div style={{ color: '#f8fafc', fontWeight: 500 }}>
              {selectedBuilding.type.replace('_', ' ').toUpperCase()}
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  marginBottom: '0.25rem',
                }}
              >
                Width
              </div>
              <div style={{ color: '#f8fafc' }}>
                {selectedBuilding.size[0].toFixed(1)}m
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  marginBottom: '0.25rem',
                }}
              >
                Height
              </div>
              <div style={{ color: '#f8fafc' }}>
                {selectedBuilding.size[1].toFixed(1)}m
              </div>
            </div>
          </div>

          {selectedBuilding.residents && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <Users size={18} color="#3b82f6" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Residents
                </div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>
                  {selectedBuilding.residents.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {selectedBuilding.employees && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(16, 185, 129, 0.3)',
              }}
            >
              <TrendingUp size={18} color="#10b981" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Employees
                </div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>
                  {selectedBuilding.employees.toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {selectedBuilding.energyConsumption && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                borderRadius: '0.5rem',
                border: '1px solid rgba(245, 158, 11, 0.3)',
              }}
            >
              <Zap size={18} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Energy Usage
                </div>
                <div style={{ color: '#f8fafc', fontWeight: 500 }}>
                  {selectedBuilding.energyConsumption.toLocaleString()} kWh
                </div>
              </div>
            </div>
          )}

          {metadata?.floors && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    marginBottom: '0.25rem',
                  }}
                >
                  Floors
                </div>
                <div style={{ color: '#f8fafc' }}>{metadata.floors}</div>
              </div>
              {metadata.yearBuilt && (
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      marginBottom: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <Calendar size={12} />
                    Built
                  </div>
                  <div style={{ color: '#f8fafc' }}>{metadata.yearBuilt}</div>
                </div>
              )}
            </div>
          )}

          {metadata?.occupancyRate && (
            <div>
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Occupancy Rate</span>
                <span style={{ color: '#f8fafc' }}>
                  {(metadata.occupancyRate * 100).toFixed(0)}%
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  backgroundColor: '#1e293b',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${metadata.occupancyRate * 100}%`,
                    height: '100%',
                    backgroundColor: '#00ff88',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
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
