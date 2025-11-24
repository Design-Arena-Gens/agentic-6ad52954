'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Jax from './Jax';
import Nino from './Nino';
import Terrain from './Terrain';

export default function Scene() {
  const jaxRef = useRef<THREE.Group>(null);
  const ninoRef = useRef<THREE.Group>(null);
  const startTime = useRef(Date.now());
  const animationDuration = 8000; // 8 seconds

  useFrame(() => {
    const elapsed = Date.now() - startTime.current;
    const t = Math.min(elapsed / animationDuration, 1); // Normalize to 0-1

    if (jaxRef.current) {
      // Jax moves along a path
      const jaxX = -15 + t * 30; // Moves from -15 to 15
      const jaxZ = Math.sin(t * Math.PI * 2) * 2; // Slight winding
      jaxRef.current.position.set(jaxX, 0.3, jaxZ);

      // Rotate towards movement direction
      const direction = Math.atan2(Math.cos(t * Math.PI * 2) * 2, 30 / animationDuration * 1000);
      jaxRef.current.rotation.y = direction;

      // Bounce effect
      jaxRef.current.position.y = 0.3 + Math.abs(Math.sin(t * 40)) * 0.1;
    }

    if (ninoRef.current) {
      // Nino follows behind, struggling
      const ninoX = -15 + t * 30 - 3; // 3 units behind
      const ninoZ = Math.sin((t - 0.1) * Math.PI * 2) * 2;
      ninoRef.current.position.set(ninoX, 0.2, ninoZ);

      // Wobbling motion
      ninoRef.current.rotation.z = Math.sin(t * 20) * 0.15;
      ninoRef.current.rotation.y = Math.sin(t * 10) * 0.1;

      // More pronounced bounce
      ninoRef.current.position.y = 0.2 + Math.abs(Math.sin(t * 30)) * 0.15;
    }
  });

  return (
    <>
      <Terrain />
      <Jax ref={jaxRef} />
      <Nino ref={ninoRef} />
    </>
  );
}
