'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import Scene from './Scene';
import DialogueSubtitles from './DialogueSubtitles';

export default function AnimationScene() {
  return (
    <div className="relative w-full h-full">
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[-8, 3, 8]} fov={45} />
        <OrbitControls
          target={[0, 0, 0]}
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={30}
        />

        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 15, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />

        <hemisphereLight
          color="#87CEEB"
          groundColor="#8B7355"
          intensity={0.6}
        />

        <fog attach="fog" args={['#98D8C8', 20, 50]} />

        <Suspense fallback={null}>
          <Environment preset="dawn" />
          <Scene />
        </Suspense>
      </Canvas>

      <DialogueSubtitles />
    </div>
  );
}
