'use client';

import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Nino = forwardRef<THREE.Group>((props, ref) => {
  const toolbagRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    // Animate toolbag swaying
    if (toolbagRef.current) {
      toolbagRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 6) * 0.3;
      toolbagRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 5) * 0.2;
    }
  });

  return (
    <group ref={ref} position={[-18, 0.2, 0]} castShadow>
      {/* Robot Body */}
      <mesh castShadow receiveShadow position={[0, 0.5, 0]}>
        <boxGeometry args={[0.6, 0.8, 0.5]} />
        <meshStandardMaterial
          color="#4169E1"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Head */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.4]} />
        <meshStandardMaterial
          color="#4169E1"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#FF6347" metalness={0.8} />
      </mesh>

      {/* Antenna ball */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#FF6347"
          emissive="#FF6347"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Eyes - nervous expression */}
      {[-0.15, 0.15].map((xPos, i) => (
        <group key={i} position={[xPos, 1.15, 0.21]}>
          {/* Eye white */}
          <mesh>
            <circleGeometry args={[0.1, 16]} />
            <meshStandardMaterial color="#FFFFFF" />
          </mesh>
          {/* Pupil - looking slightly up/worried */}
          <mesh position={[i === 0 ? -0.02 : 0.02, 0.03, 0.01]}>
            <circleGeometry args={[0.05, 16]} />
            <meshStandardMaterial color="#000000" />
          </mesh>
          {/* Eye gleam */}
          <mesh position={[i === 0 ? -0.03 : 0.01, 0.04, 0.02]}>
            <circleGeometry args={[0.02, 8]} />
            <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}

      {/* Worried mouth */}
      <mesh position={[0, 1.0, 0.21]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Arms */}
      {[-1, 1].map((side, i) => (
        <group key={i}>
          {/* Upper arm */}
          <mesh
            castShadow
            position={[side * 0.35, 0.5, 0]}
            rotation={[0, 0, side * 0.3]}
          >
            <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
            <meshStandardMaterial color="#4169E1" metalness={0.7} />
          </mesh>

          {/* Lower arm */}
          <mesh
            castShadow
            position={[side * 0.45, 0.15, 0]}
            rotation={[0, 0, side * 0.5]}
          >
            <cylinderGeometry args={[0.07, 0.07, 0.3, 8]} />
            <meshStandardMaterial color="#5A7FC4" metalness={0.7} />
          </mesh>

          {/* Hand */}
          <mesh
            castShadow
            position={[side * 0.5, 0, 0]}
          >
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#5A7FC4" metalness={0.7} />
          </mesh>
        </group>
      ))}

      {/* Legs */}
      {[-0.15, 0.15].map((xPos, i) => (
        <group key={i}>
          {/* Upper leg */}
          <mesh castShadow position={[xPos, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.08, 0.4, 8]} />
            <meshStandardMaterial color="#4169E1" metalness={0.7} />
          </mesh>

          {/* Foot */}
          <mesh castShadow position={[xPos, -0.25, 0.05]}>
            <boxGeometry args={[0.12, 0.08, 0.2]} />
            <meshStandardMaterial color="#2C5AA0" metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Toolbag - attached to right side */}
      <group ref={toolbagRef} position={[0.4, 0.3, 0]}>
        {/* Bag body */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.4, 0.25]} />
          <meshStandardMaterial
            color="#8B4513"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>

        {/* Bag strap */}
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
          <meshStandardMaterial color="#654321" roughness={0.8} />
        </mesh>

        {/* Tools sticking out */}
        {/* Wrench */}
        <mesh position={[0, 0.3, 0.1]} rotation={[0.3, 0.2, 0.1]}>
          <boxGeometry args={[0.05, 0.25, 0.02]} />
          <meshStandardMaterial color="#C0C0C0" metalness={0.9} />
        </mesh>

        {/* Screwdriver */}
        <mesh position={[0.1, 0.28, 0]} rotation={[0.2, -0.3, 0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#FF8C00" />
        </mesh>

        {/* Hammer handle sticking out */}
        <mesh position={[-0.1, 0.25, 0.05]} rotation={[0.4, 0.1, -0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </group>

      {/* Chest panel details */}
      <mesh position={[0, 0.6, 0.26]}>
        <boxGeometry args={[0.3, 0.2, 0.02]} />
        <meshStandardMaterial color="#5A7FC4" metalness={0.9} />
      </mesh>

      {/* Chest indicator lights */}
      {[-0.08, 0, 0.08].map((yPos, i) => (
        <mesh key={i} position={[0, 0.65 + yPos * 0.5, 0.27]}>
          <cylinderGeometry args={[0.03, 0.03, 0.01, 8]} />
          <meshStandardMaterial
            color={i === 1 ? "#00FF00" : "#FF0000"}
            emissive={i === 1 ? "#00FF00" : "#FF0000"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
});

Nino.displayName = 'Nino';

export default Nino;
