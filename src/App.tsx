import { useState, useEffect } from 'react';
import City3DViewer from './components/City3DViewer';
import AIAssistant from './components/AIAssistant';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotificationSystem } from './components/NotificationSystem';
import { BuildingInfoPanel } from './components/BuildingInfoPanel';
import { useAppStore } from './store/appStore';
import { cityGeneratorService } from './services/city-generator.service';
import { LoadingState } from './components/LoadingState';

function App() {
  const [activeView, setActiveView] = useState<'city' | 'dashboard'>('city');
  const { buildings, setBuildings, isLoading, setLoading } = useAppStore();

  useEffect(() => {
    if (buildings.length === 0) {
      setLoading(true);
      setTimeout(() => {
        const generatedBuildings = cityGeneratorService.generate();
        setBuildings(generatedBuildings);
        setLoading(false);
      }, 500);
    }
  }, [buildings.length, setBuildings, setLoading]);

  return (
    <ErrorBoundary>
      <div style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#0a0f1e'
      }}>
        <Header activeView={activeView} setActiveView={setActiveView} />
        <div style={{ flex: 1, display: 'flex', position: 'relative' }}>
          {isLoading ? (
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <LoadingState message="Generating city..." size="large" />
            </div>
          ) : (
            activeView === 'city' ? (
              <>
                <City3DViewer />
                <BuildingInfoPanel />
                <AIAssistant />
              </>
            ) : (
              <Dashboard />
            )
          )}
        </div>
        <NotificationSystem />
      </div>
    </ErrorBoundary>
  );
}

export default App;
