'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Subtitle {
  start: number;
  end: number;
  text: string;
  character: string;
  color: string;
}

const subtitles: Subtitle[] = [
  {
    start: 1000,
    end: 3000,
    text: '"Come on, Nino! If you\'re slow, we won\'t make it!"',
    character: 'JAX',
    color: '#CC0000',
  },
  {
    start: 3500,
    end: 5500,
    text: '"Wait! This bag is too heavy!"',
    character: 'NINO',
    color: '#4169E1',
  },
];

export default function DialogueSubtitles() {
  const [currentSubtitle, setCurrentSubtitle] = useState<Subtitle | null>(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const activeSubtitle = subtitles.find(
        (sub) => elapsed >= sub.start && elapsed <= sub.end
      );

      setCurrentSubtitle(activeSubtitle || null);
    }, 100);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-end pb-12 pointer-events-none">
      <AnimatePresence mode="wait">
        {currentSubtitle && (
          <motion.div
            key={currentSubtitle.text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-75 rounded-lg px-6 py-4 max-w-2xl mx-4"
          >
            <div
              className="font-bold text-sm mb-1"
              style={{ color: currentSubtitle.color }}
            >
              {currentSubtitle.character}
            </div>
            <div className="text-white text-lg font-medium">
              {currentSubtitle.text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replay button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg pointer-events-auto transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          window.location.reload();
        }}
      >
        Replay
      </motion.button>
    </div>
  );
}
