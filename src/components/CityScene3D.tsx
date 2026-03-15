import { useRef, useMemo, useState } from 'react';
import { useFrame, ThreeEvent } from '@react-three/fiber';
import { InstancedMesh, Object3D, Color } from 'three';
import type { Building } from '../types';
import { useAppStore } from '../store/appStore';

interface CityScene3DProps {
  buildings: Building[];
}

const tempObject = new Object3D();
const tempColor = new Color();

export function CityScene3D({ buildings }: CityScene3DProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { selectBuilding, selectedBuilding } = useAppStore();

  const buildingData = useMemo(() => {
    return buildings.map((building, index) => ({
      ...building,
      index,
      baseColor: new Color(building.color),
    }));
  }, [buildings]);

  useFrame(() => {
    if (!meshRef.current) return;

    buildingData.forEach((building, i) => {
      const [x, y, z] = building.position;
      const [width, height, depth] = building.size;

      tempObject.position.set(x, y, z);
      tempObject.scale.set(width, height, depth);
      tempObject.updateMatrix();

      const isHovered = hoveredId === i;
      const isSelected = selectedBuilding?.id === building.id;

      if (isSelected) {
        tempColor.set('#ffffff');
      } else if (isHovered) {
        tempColor.set('#00ff88');
      } else {
        tempColor.copy(building.baseColor);
      }

      meshRef.current!.setMatrixAt(i, tempObject.matrix);
      meshRef.current!.setColorAt(i, tempColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    if (event.instanceId !== undefined) {
      setHoveredId(event.instanceId);
      document.body.style.cursor = 'pointer';
    }
  };

  const handlePointerOut = () => {
    setHoveredId(null);
    document.body.style.cursor = 'default';
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    if (event.instanceId !== undefined) {
      const building = buildingData[event.instanceId];
      selectBuilding(building);
    }
  };

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, buildings.length]}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <boxGeometry />
        <meshStandardMaterial
          roughness={0.7}
          metalness={0.3}
          envMapIntensity={0.5}
        />
      </instancedMesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#1e293b"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      <gridHelper args={[200, 50, '#00ff88', '#334155']} position={[0, 0.1, 0]} />
    </>
  );
}
