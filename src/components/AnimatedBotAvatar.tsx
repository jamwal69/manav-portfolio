'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AnimatedBotAvatarProps {
  size?: number;
  className?: string;
}

const AnimatedBotAvatar = ({ size = 40, className = '' }: AnimatedBotAvatarProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  // Animation cycle: changes frame every 10 seconds as requested
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 8);
    }, 10000); // 10 seconds per frame

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ 
        scale: [1, 1.05, 1],
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {/* Main bot avatar using your 8-frame image */}
      <div
        className="w-full h-full bg-no-repeat bg-cover rounded-full border-2 border-cyan-400 shadow-lg"
        style={{
          backgroundImage: 'url(/bot-frames.png)',
          backgroundPosition: `${currentFrame * -100}% 0%`,
          backgroundSize: '800% 100%', // 8 frames = 800% width
          filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))',
        }}
      />
      
      {/* Glowing border effect */}
      <div 
        className="absolute inset-0 rounded-full border border-cyan-400 opacity-50"
        style={{
          boxShadow: `0 0 ${size * 0.3}px rgba(34, 211, 238, 0.4)`
        }}
      />
      
      {/* Particle effects */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [-10, -20, -10],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AnimatedBotAvatar;
