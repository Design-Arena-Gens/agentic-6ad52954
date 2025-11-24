'use client';

import dynamic from 'next/dynamic';

const AnimationScene = dynamic(() => import('@/components/AnimationScene'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <AnimationScene />
    </main>
  );
}
