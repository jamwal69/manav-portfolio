'use client';

import { motion } from 'framer-motion';

interface PunkAvatarProps {
  size?: number;
  className?: string;
}

export default function PunkAvatar({ size = 40, className = '' }: PunkAvatarProps) {
  return (
    <motion.div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Base avatar circle */}
      <div 
        className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border-2 border-blue-400 shadow-lg"
        style={{ width: size, height: size }}
      >
        {/* Punk face features */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width={size * 0.8}
            height={size * 0.8}
            viewBox="0 0 32 32"
            className="text-white"
          >
            {/* Hair spikes */}
            <path
              d="M8 4 L10 2 L12 4 M14 3 L16 1 L18 3 M20 4 L22 2 L24 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              className="text-cyan-300"
            />
            
            {/* Face outline */}
            <circle
              cx="16"
              cy="16"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-slate-200"
            />
            
            {/* Cyberpunk eyes */}
            <circle cx="12" cy="14" r="1.5" fill="currentColor" className="text-cyan-400" />
            <circle cx="20" cy="14" r="1.5" fill="currentColor" className="text-cyan-400" />
            
            {/* Eye glow effect */}
            <circle cx="12" cy="14" r="0.5" fill="currentColor" className="text-white" />
            <circle cx="20" cy="14" r="0.5" fill="currentColor" className="text-white" />
            
            {/* Nose */}
            <path d="M16 16 L15 18 L17 18 Z" fill="currentColor" className="text-slate-300" />
            
            {/* Smirk */}
            <path
              d="M14 20 Q16 22 18 20"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-slate-200"
            />
            
            {/* Punk accessories - ear piercings */}
            <circle cx="8" cy="16" r="0.5" fill="currentColor" className="text-yellow-400" />
            <circle cx="24" cy="16" r="0.5" fill="currentColor" className="text-yellow-400" />
            
            {/* Face tattoo/markings */}
            <path
              d="M10 12 L8 10 M22 12 L24 10"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-purple-300"
            />
          </svg>
        </div>
        
        {/* Glowing border effect */}
        <div 
          className="absolute inset-0 rounded-full border border-cyan-400 opacity-50 animate-pulse"
          style={{ 
            boxShadow: '0 0 10px rgba(34, 211, 238, 0.3), inset 0 0 10px rgba(34, 211, 238, 0.1)' 
          }}
        />
        
        {/* Tech overlay */}
        <div className="absolute top-1 right-1">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Floating particles */}
      <motion.div
        className="absolute -top-1 -right-1 w-1 h-1 bg-cyan-400 rounded-full"
        animate={{ 
          y: [-2, -6, -2],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-400 rounded-full"
        animate={{ 
          y: [2, 6, 2],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>
  );
}
