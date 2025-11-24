'use client';

import { forwardRef } from 'react';
import * as THREE from 'three';

const Jax = forwardRef<THREE.Group>((props, ref) => {
  return (
    <group ref={ref} position={[-15, 0.3, 0]} castShadow>
      {/* Jeep Body */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[1.8, 0.8, 1.2]} />
        <meshStandardMaterial
          color="#CC0000"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Cabin */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[1.2, 0.6, 1.0]} />
        <meshStandardMaterial
          color="#CC0000"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Windshield */}
      <mesh position={[0.5, 1.1, 0]}>
        <boxGeometry args={[0.2, 0.5, 0.9]} />
        <meshStandardMaterial
          color="#88CCFF"
          transparent
          opacity={0.6}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Hood */}
      <mesh castShadow position={[0.9, 0.6, 0]}>
        <boxGeometry args={[0.6, 0.3, 1.1]} />
        <meshStandardMaterial
          color="#CC0000"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Wheels */}
      {[
        [-0.6, 0, 0.6],
        [-0.6, 0, -0.6],
        [0.6, 0, 0.6],
        [0.6, 0, -0.6],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.15, 0.15, 0.25, 16]} />
            <meshStandardMaterial color="#666666" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Headlights with animated eyes */}
      {[0.5, -0.5].map((zPos, i) => (
        <group key={i} position={[1.2, 0.5, zPos]}>
          {/* Headlight housing */}
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
          </mesh>
          {/* Eye (pupil) */}
          <mesh position={[0.06, 0, 0]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Eye gleam */}
          <mesh position={[0.08, 0.03, 0.03]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* Bumper with mud */}
      <mesh castShadow position={[1.0, 0.2, 0]}>
        <boxGeometry args={[0.3, 0.15, 1.3]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} />
      </mesh>

      {/* Mud splatter on bumper */}
      <mesh position={[1.15, 0.2, 0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={1} />
      </mesh>
      <mesh position={[1.15, 0.15, -0.2]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#5C4033" roughness={1} />
      </mesh>

      {/* Roof rack */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.0, 0.05, 0.8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
      </mesh>

      {/* Exhaust smoke */}
      <mesh position={[-1.0, 0.3, 0.5]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color="#CCCCCC"
          transparent
          opacity={0.3}
          roughness={1}
        />
      </mesh>
    </group>
  );
});

Jax.displayName = 'Jax';

export default Jax;
