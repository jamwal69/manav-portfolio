"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Shield, Bug, Code, Zap, Lock, Terminal } from "lucide-react";

// Custom easing functions inspired by Phaser (as cubic bezier arrays)
const easings = {
  // Bounce effect - like a ball dropping
  bounceOut: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  // Elastic effect - like a rubber band
  elasticOut: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  // Back effect - overshoots then comes back
  backOut: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
  // Smooth in and out
  smoothInOut: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
};

// Floating Security Bot Character
export function FloatingSecurityBot() {
  const controls = useAnimation();

  useEffect(() => {
    // Continuous floating animation with bounce easing
    const animate = async () => {
      while (true) {
        await controls.start({
          y: [-20, 20, -20],
          x: [0, 10, 0, -10, 0],
          rotate: [0, 5, 0, -5, 0],
          transition: {
            duration: 4,
            ease: easings.bounceOut,
            repeat: Infinity,
            repeatType: "reverse",
          },
        });
      }
    };
    animate();
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="fixed top-32 right-20 z-10 cursor-pointer hover:scale-110 transition-transform"
      whileHover={{ scale: 1.2, rotate: 360 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="relative">
        {/* Robot body */}
        <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-lg shadow-cyan-500/50 flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
        {/* Antenna */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-cyan-400 rounded-full"
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-300 rounded-full animate-ping" />
        </motion.div>
        {/* Glowing eyes */}
        <div className="absolute top-4 left-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <div className="absolute top-4 right-2 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
}

// Bug Hunter Character - moves across screen
export function BugHunterCharacter() {
  const [isHunting, setIsHunting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsHunting(true);
      setTimeout(() => setIsHunting(false), 5000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {isHunting && (
        <>
          {/* Bug Character */}
          <motion.div
            initial={{ x: -100, y: 100 }}
            animate={{
              x: window.innerWidth + 100,
              y: [100, 150, 100, 200, 150],
            }}
            transition={{
              duration: 5,
              ease: easings.backOut,
              y: {
                duration: 5,
                ease: "easeInOut",
                repeat: 0,
              },
            }}
            className="fixed z-20 pointer-events-none"
          >
            <div className="relative">
              <Bug className="w-12 h-12 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"
              />
            </div>
          </motion.div>

          {/* Hunter (Your mascot chasing the bug) */}
          <motion.div
            initial={{ x: -50, y: 120 }}
            animate={{
              x: window.innerWidth + 50,
              y: [120, 170, 120, 220, 170],
            }}
            transition={{
              duration: 4.8,
              ease: easings.smoothInOut,
              y: {
                duration: 4.8,
                ease: "easeInOut",
                repeat: 0,
              },
            }}
            className="fixed z-20 pointer-events-none"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-500/50 flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              {/* Speed lines */}
              <motion.div
                animate={{ opacity: [0, 1, 0], x: [-20, -40] }}
                transition={{ duration: 0.3, repeat: Infinity }}
                className="absolute top-1/2 -left-6 w-8 h-1 bg-gradient-to-l from-green-400 to-transparent"
              />
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}

// Floating Code Particles
export function FloatingCodeParticles() {
  const codeSymbols = ["{ }", "< />", "=>", "fn()", "[]", "&&", "||", "0x"];
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {codeSymbols.map((symbol, index) => (
        <motion.div
          key={index}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 50,
            opacity: [0, 0.6, 0.6, 0],
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth * 0.8,
            ],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: easings.smoothInOut,
          }}
          className="absolute text-cyan-500/30 font-mono text-sm"
        >
          {symbol}
        </motion.div>
      ))}
    </div>
  );
}

// Lock Character - spins and bounces when appearing
export function LockGuardian() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Appear when user scrolls to middle of page
      setIsVisible(scrollY > windowHeight * 0.5 && scrollY < windowHeight * 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8,
      }}
      className="fixed bottom-32 left-20 z-10"
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: easings.elasticOut,
        }}
        className="relative cursor-pointer"
        whileHover={{ scale: 1.2 }}
      >
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/50 flex items-center justify-center">
          <Lock className="w-8 h-8 text-white" />
        </div>
        {/* Particle effect */}
        <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute inset-0 rounded-2xl border-2 border-purple-400"
        />
      </motion.div>
    </motion.div>
  );
}

// Terminal Character - types and moves
export function TypingTerminalBot() {
  const [text, setText] = useState("");
  const fullText = "Scanning... 100% Secure ✓";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setText("");
        }, 2000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: 1,
      }}
      className="fixed bottom-8 right-8 z-10"
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 20px rgba(34, 211, 238, 0.3)",
            "0 0 40px rgba(34, 211, 238, 0.6)",
            "0 0 20px rgba(34, 211, 238, 0.3)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="bg-slate-900/90 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-4 max-w-xs"
      >
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>
        </div>
        <div className="font-mono text-xs text-cyan-300">
          <span className="text-green-400">$</span> {text}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-cyan-400 ml-1"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Data Stream Character - flowing data particles
export function DataStreamEffect() {
  const streams = Array.from({ length: 5 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {streams.map((stream) => (
        <motion.div
          key={stream}
          initial={{
            y: -100,
            x: (stream * window.innerWidth) / 5,
          }}
          animate={{
            y: window.innerHeight + 100,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: stream * 0.5,
            ease: "linear",
          }}
          className="absolute"
        >
          <Code className="w-6 h-6 text-cyan-400" />
        </motion.div>
      ))}
    </div>
  );
}

// Main container for all characters
export default function AnimatedCharacters() {
  return (
    <>
      <FloatingCodeParticles />
      <DataStreamEffect />
      <FloatingSecurityBot />
      <BugHunterCharacter />
      <LockGuardian />
      <TypingTerminalBot />
    </>
  );
}
