'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface BootSequenceProps {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const bootSteps = useMemo(() => ([
    { text: 'INITIALIZING QUANTUM SECURITY PROTOCOLS...', duration: 1500 },
    { text: 'LOADING NEURAL NETWORKS...', duration: 2000, hasProgress: true },
    { text: 'ESTABLISHING ENCRYPTED CHANNELS...', duration: 1200 },
    { text: 'SCANNING FOR VULNERABILITIES...', duration: 1800 },
    { text: 'BLOCKCHAIN VERIFICATION COMPLETE...', duration: 1000 },
    { text: 'AI ASSISTANT ONLINE...', duration: 800 },
    { text: 'WELCOME TO MSJ.DEV SECURE TERMINAL', duration: 1500 },
    { text: 'SYSTEM READY - LAUNCHING INTERFACE...', duration: 1000 }
  ]), []);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentStep < bootSteps.length) {
      const step = bootSteps[currentStep];
      setIsTyping(true);
      
      // Typewriter effect
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < step.text.length) {
          setDisplayText(step.text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          
          // Progress bar animation for neural networks
          if (step.hasProgress) {
            const progressInterval = setInterval(() => {
              setProgress(prev => {
                if (prev >= 100) {
                  clearInterval(progressInterval);
                  setTimeout(() => {
                    setCurrentStep(prev => prev + 1);
                    setDisplayText('');
                    setProgress(0);
                  }, 500);
                  return 100;
                }
                return prev + 2;
              });
            }, 20);
          } else {
            setTimeout(() => {
              setCurrentStep(prev => prev + 1);
              setDisplayText('');
            }, step.duration);
          }
        }
      }, 50);

      return () => clearInterval(typeInterval);
    } else {
      // Boot sequence complete
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentStep, onComplete, bootSteps]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault();
      onComplete();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center font-mono"
    >
      {/* Matrix-style background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to ensure consistency between server and client
          const leftPercent = ((i * 7) % 100);
          const topPercent = ((i * 13) % 100);
          const duration = 2 + (i % 3);
          const delay = (i % 4) * 0.5;
          const text = `code${i.toString(36)}`;
          
          return (
            <motion.div
              key={i}
              className="absolute text-green-400 text-xs opacity-20"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
              }}
              animate={{
                y: [-20, 800],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
              }}
            >
              {text}
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-8">
        {/* Terminal Header */}
        <div className="border border-cyan-400 rounded-lg bg-black/80 backdrop-blur-sm">
          <div className="flex items-center gap-2 p-3 border-b border-cyan-400/30 bg-cyan-900/20">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-cyan-400 text-sm">MSJ SECURE TERMINAL v2.1.0</span>
          </div>
          
          <div className="p-6 min-h-[300px]">
            {/* Previous steps */}
            <div className="space-y-2 mb-4">
              {bootSteps.slice(0, currentStep).map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="text-green-400 text-sm"
                >
                  <span className="text-cyan-400">[✓]</span> {step.text}
                </motion.div>
              ))}
            </div>

            {/* Current step */}
            {currentStep < bootSteps.length && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                  />
                  <span className="text-cyan-400 text-sm">
                    {displayText}
                    {isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="ml-1"
                      >
                        |
                      </motion.span>
                    )}
                  </span>
                </div>

                {/* Progress bar for neural networks */}
                {bootSteps[currentStep]?.hasProgress && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-cyan-400 mb-1">
                      <span>Loading...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* System specs */}
            <div className="mt-8 pt-4 border-t border-cyan-400/20">
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-400">
                <div>
                  <div>CPU: Quantum Processing Unit</div>
                  <div>RAM: 128TB Neural Memory</div>
                  <div>GPU: Holographic Renderer</div>
                </div>
                <div>
                  <div>Security: AES-2048 Quantum</div>
                  <div>AI Core: GPT-X Neural Net</div>
                  <div>Network: Blockchain Mesh</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skip button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1 }}
          className="mt-4 text-cyan-400 text-xs tracking-wide text-center"
        >
          Press ANY key to skip | Auto-continue after completion
        </motion.div>
      </div>
    </motion.div>
  );
}
