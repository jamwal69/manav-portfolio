'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isMounted]);

  const loadingTexts = [
    "Initializing Neural Network...",
    "Loading Security Protocols...",
    "Establishing Encrypted Connection...",
    "Syncing Blockchain Data...",
    "Activating AI Assistant...",
    "Welcome to the Future..."
  ];

  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    if (!isMounted) return;
    
    const textInterval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => clearInterval(textInterval);
  }, [loadingTexts.length, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
        >
          <div className="text-center relative z-10">
            {/* Main logo/title */}
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-6xl font-bold mb-8 text-blue-500"
            >
              MSJ<span className="text-white">.</span>DEV
            </motion.h1>

            {/* Simple rotating loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-8 border-4 border-slate-700 border-t-blue-500 rounded-full"
            />

            {/* Progress bar */}
            <div className="w-80 mx-auto mb-6">
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-slate-400">
                <span>Loading...</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>

            {/* Loading text */}
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl text-blue-400"
            >
              {loadingTexts[currentText]}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
