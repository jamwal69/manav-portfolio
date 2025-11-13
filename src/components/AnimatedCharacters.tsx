"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

// Custom easing functions for smooth Phaser-like animations
const easings = {
  bounceOut: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  elasticOut: [0.68, -0.55, 0.265, 1.55] as [number, number, number, number],
  backOut: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
  smoothInOut: [0.645, 0.045, 0.355, 1] as [number, number, number, number],
};

// Security Bot Character - floats around the screen
export function SecurityBot() {
  const controls = useAnimationControls();

  useEffect(() => {
    const animate = async () => {
      await controls.start({
        y: [0, -30, 0, -20, 0],
        x: [0, 15, -15, 10, 0],
        rotate: [0, -5, 5, -3, 0],
        transition: {
          duration: 8,
          ease: easings.smoothInOut,
          repeat: Infinity,
        },
      });
    };
    animate();
  }, [controls]);

  return (
    <motion.div
      animate={controls}
      className="fixed top-24 right-12 z-10 cursor-pointer select-none"
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Using CSS to create a robot character */}
      <div className="relative w-16 h-20">
        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-lg shadow-lg shadow-cyan-500/50">
          {/* Antenna */}
          <motion.div
            animate={{ scaleY: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-400"
          >
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </motion.div>
          {/* Eyes */}
          <div className="absolute top-3 left-2 w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,1)]" />
          <div className="absolute top-3 right-2 w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,1)]" />
          {/* Mouth line */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-cyan-200 rounded-full" />
        </div>
        {/* Body */}
        <div className="absolute top-11 left-1/2 -translate-x-1/2 w-10 h-8 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded shadow-lg">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-cyan-300 rounded-full" />
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-1 bg-cyan-300 rounded-full" />
        </div>
        {/* Shield icon */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 text-xs">🛡️</div>
      </div>
    </motion.div>
  );
}

// Bug Character - crawls across screen periodically
export function BugCharacter() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const showBug = () => {
      setIsActive(true);
      setTimeout(() => setIsActive(false), 6000);
    };

    // Show bug every 20 seconds
    const interval = setInterval(showBug, 20000);
    // Show first bug after 5 seconds
    const timeout = setTimeout(showBug, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!isActive) return null;

  return (
    <motion.div
      initial={{ x: -100, y: window.innerHeight * 0.3 }}
      animate={{
        x: window.innerWidth + 100,
        y: [
          window.innerHeight * 0.3,
          window.innerHeight * 0.35,
          window.innerHeight * 0.3,
          window.innerHeight * 0.4,
          window.innerHeight * 0.35,
        ],
      }}
      transition={{
        duration: 6,
        ease: easings.smoothInOut,
      }}
      className="fixed z-20 pointer-events-none select-none"
    >
      <div className="relative">
        {/* Bug body using CSS */}
        <div className="w-8 h-8 bg-red-600 rounded-full shadow-lg shadow-red-500/50 relative">
          {/* Bug spots */}
          <div className="absolute top-1 left-1 w-2 h-2 bg-red-900 rounded-full" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-900 rounded-full" />
          <div className="absolute bottom-1 left-2 w-1.5 h-1.5 bg-red-900 rounded-full" />
          {/* Antennae */}
          <div className="absolute -top-2 left-2 w-0.5 h-3 bg-red-800 rotate-[-20deg]" />
          <div className="absolute -top-2 right-2 w-0.5 h-3 bg-red-800 rotate-[20deg]" />
        </div>
        {/* Alert icon */}
        <div className="absolute -top-3 -right-3 text-xl animate-pulse">⚠️</div>
      </div>
    </motion.div>
  );
}

// Lock Character - appears on scroll
export function LockCharacter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setIsVisible(scrollPercent > 0.2 && scrollPercent < 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="fixed bottom-32 left-12 z-10 select-none"
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: easings.elasticOut,
        }}
        whileHover={{ scale: 1.2, rotate: 360 }}
        className="cursor-pointer"
      >
        {/* Lock character */}
        <div className="relative w-14 h-16">
          {/* Shackle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-6 border-4 border-purple-500 rounded-t-full" />
          {/* Body */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-lg shadow-purple-500/50">
            {/* Keyhole */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2">
              <div className="w-2 h-2 bg-purple-200 rounded-full" />
              <div className="w-1 h-3 bg-purple-200 mx-auto" />
            </div>
          </div>
          {/* Sparkle effect */}
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 border-2 border-purple-400 rounded-lg"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// Code Rain Effect - Matrix style
export function CodeRain() {
  const columns = 20;
  const codeChars = ["0", "1", "{", "}", "<", ">", "/", "fn", "=>", "&&", "||"];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: (i * window.innerWidth) / columns,
          }}
          animate={{
            y: window.innerHeight + 100,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "linear",
          }}
          className="absolute font-mono text-sm text-cyan-400"
        >
          {codeChars[Math.floor(Math.random() * codeChars.length)]}
        </motion.div>
      ))}
    </div>
  );
}

// Shield Guardian - protective character
export function ShieldGuardian() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveShield = () => {
      const newX = Math.random() * (window.innerWidth - 200) + 100;
      const newY = Math.random() * (window.innerHeight - 300) + 100;
      setPosition({ x: newX, y: newY });
    };

    // Move to new position every 10 seconds
    const interval = setInterval(moveShield, 10000);
    moveShield(); // Initial position

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{
        duration: 2,
        ease: easings.backOut,
      }}
      className="fixed z-5 pointer-events-none select-none"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        {/* Shield character */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg rotate-45 shadow-lg shadow-green-500/30" />
          <div className="absolute inset-2 bg-gradient-to-br from-green-500 to-emerald-700 rounded-lg rotate-45" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">
            ✓
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Mini Terminal Window - typing effect
export function MiniTerminal() {
  const [text, setText] = useState("");
  const messages = [
    "$ scanning ports...",
    "$ analyzing threats...",
    "$ system secure ✓",
    "$ firewall active ✓",
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const currentMessage = messages[messageIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex <= currentMessage.length) {
        setText(currentMessage.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [messageIndex]);

  return (
    <motion.div
      initial={{ x: window.innerWidth }}
      animate={{ x: window.innerWidth - 250 }}
      transition={{ type: "spring", stiffness: 100, delay: 2 }}
      className="fixed top-24 z-10 select-none"
    >
      <div className="bg-slate-900/95 backdrop-blur-sm border border-cyan-500/50 rounded-lg p-3 w-60 shadow-lg shadow-cyan-500/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs text-cyan-400 ml-auto">terminal</span>
        </div>
        <div className="font-mono text-xs text-green-400">
          {text}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="inline-block w-2 h-3 bg-green-400 ml-1"
          />
        </div>
      </div>
    </motion.div>
  );
}

// Main Component - combines all characters
export default function AnimatedCharacters() {
  return (
    <>
      <CodeRain />
      <SecurityBot />
      <BugCharacter />
      <LockCharacter />
      <ShieldGuardian />
      <MiniTerminal />
    </>
  );
}
