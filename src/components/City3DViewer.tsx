import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import { CityScene3D } from './CityScene3D';
import { useAppStore } from '../store/appStore';

export default function City3DViewer() {
  const { buildings, sceneConfig } = useAppStore();

  return (
    <div style={{ flex: 1, position: 'relative' }}>
      <Canvas
        shadows={sceneConfig.enableShadows}
        dpr={[1, 2]}
        gl={{ antialias: sceneConfig.antialiasing }}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[50, 40, 50]} fov={60} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={20}
            maxDistance={150}
            maxPolarAngle={Math.PI / 2.2}
            maxAzimuthAngle={Infinity}
            minAzimuthAngle={-Infinity}
            enableDamping={true}
            dampingFactor={0.05}
          />

          <ambientLight intensity={0.4} />
          <directionalLight
            position={[50, 50, 25]}
            intensity={1}
            castShadow={sceneConfig.enableShadows}
            shadow-mapSize={[
              sceneConfig.shadowQuality === 'ultra' ? 4096 :
              sceneConfig.shadowQuality === 'high' ? 2048 :
              sceneConfig.shadowQuality === 'medium' ? 1024 : 512,
              sceneConfig.shadowQuality === 'ultra' ? 4096 :
              sceneConfig.shadowQuality === 'high' ? 2048 :
              sceneConfig.shadowQuality === 'medium' ? 1024 : 512
            ]}
            shadow-camera-far={200}
            shadow-camera-left={-100}
            shadow-camera-right={100}
            shadow-camera-top={100}
            shadow-camera-bottom={-100}
          />

          <hemisphereLight args={['#ffffff', '#1e293b', 0.3]} />

          <Environment preset="city" />

          <CityScene3D buildings={buildings} />
        </Suspense>
      </Canvas>

      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '2rem',
        background: 'rgba(22, 33, 62, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '1rem',
        borderRadius: '0.75rem',
        border: '1px solid rgba(0, 255, 136, 0.3)',
        maxWidth: '300px'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#00ff88' }}>
          City Controls
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.5 }}>
          • Left click + drag to rotate<br />
          • Right click + drag to pan<br />
          • Scroll to zoom
        </p>
      </div>
    </div>
  );
}
