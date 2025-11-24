'use client';

import * as THREE from 'three';
import { useMemo } from 'react';

export default function Terrain() {
  // Generate random grass positions
  const grassPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 200; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        scale: 0.3 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI,
      });
    }
    return positions;
  }, []);

  // Generate random rock positions
  const rockPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 30; i++) {
      positions.push({
        x: (Math.random() - 0.5) * 40,
        z: (Math.random() - 0.5) * 40,
        scale: 0.2 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    return positions;
  }, []);

  // Generate random tree positions
  const treePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      // Keep trees away from the center path
      if (Math.abs(z) > 5 || Math.abs(x) > 20) {
        positions.push({
          x,
          z,
          scale: 0.8 + Math.random() * 0.6,
        });
      }
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Ground plane */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial
          color="#7CB342"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Dirt path */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[100, 6]} />
        <meshStandardMaterial
          color="#8B7355"
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Path tire tracks */}
      {[-1.5, 1.5].map((zOffset, i) => (
        <mesh
          key={i}
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, zOffset]}
        >
          <planeGeometry args={[100, 0.3]} />
          <meshStandardMaterial
            color="#654321"
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}

      {/* Grass blades */}
      {grassPositions.map((pos, i) => (
        <group
          key={`grass-${i}`}
          position={[pos.x, 0, pos.z]}
          rotation={[0, pos.rotation, 0]}
          scale={pos.scale}
        >
          <mesh castShadow>
            <coneGeometry args={[0.1, 0.6, 3]} />
            <meshStandardMaterial
              color="#558B2F"
              roughness={0.9}
              flatShading
            />
          </mesh>
        </group>
      ))}

      {/* Rocks */}
      {rockPositions.map((pos, i) => (
        <mesh
          key={`rock-${i}`}
          castShadow
          receiveShadow
          position={[pos.x, pos.scale * 0.3, pos.z]}
          rotation={[
            Math.random() * 0.5,
            pos.rotation,
            Math.random() * 0.5,
          ]}
          scale={pos.scale}
        >
          <dodecahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#696969"
            roughness={0.95}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Trees */}
      {treePositions.map((pos, i) => (
        <group
          key={`tree-${i}`}
          position={[pos.x, 0, pos.z]}
          scale={pos.scale}
        >
          {/* Trunk */}
          <mesh castShadow position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
            <meshStandardMaterial
              color="#5D4037"
              roughness={0.9}
            />
          </mesh>

          {/* Foliage - 3 layers for Pixar style */}
          <mesh castShadow position={[0, 3.5, 0]}>
            <coneGeometry args={[1.5, 2, 8]} />
            <meshStandardMaterial
              color="#2E7D32"
              roughness={0.8}
              flatShading
            />
          </mesh>

          <mesh castShadow position={[0, 4.3, 0]}>
            <coneGeometry args={[1.2, 1.6, 8]} />
            <meshStandardMaterial
              color="#388E3C"
              roughness={0.8}
              flatShading
            />
          </mesh>

          <mesh castShadow position={[0, 5, 0]}>
            <coneGeometry args={[0.9, 1.2, 8]} />
            <meshStandardMaterial
              color="#43A047"
              roughness={0.8}
              flatShading
            />
          </mesh>
        </group>
      ))}

      {/* Dust particles along path */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = -15 + (i / 20) * 30;
        return (
          <mesh
            key={`dust-${i}`}
            position={[x, 0.2, Math.sin(i * 0.5) * 2]}
          >
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial
              color="#D2B48C"
              transparent
              opacity={0.3}
              roughness={1}
            />
          </mesh>
        );
      })}

      {/* Small flowers scattered around */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 40;
        // Keep flowers away from path
        if (Math.abs(z) < 4) return null;

        return (
          <group key={`flower-${i}`} position={[x, 0.1, z]}>
            {/* Stem */}
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
              <meshStandardMaterial color="#4CAF50" />
            </mesh>

            {/* Petals */}
            {Array.from({ length: 5 }).map((_, j) => (
              <mesh
                key={j}
                position={[
                  Math.cos((j / 5) * Math.PI * 2) * 0.08,
                  0.2,
                  Math.sin((j / 5) * Math.PI * 2) * 0.08,
                ]}
                rotation={[Math.PI / 2, 0, (j / 5) * Math.PI * 2]}
              >
                <circleGeometry args={[0.06, 8]} />
                <meshStandardMaterial
                  color={['#FFD700', '#FF69B4', '#87CEEB'][i % 3]}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}

            {/* Center */}
            <mesh position={[0, 0.2, 0]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color="#FFA500" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
