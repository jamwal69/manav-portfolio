'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingTerminal() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Terminal Screen */}
      <Box args={[3, 2, 0.1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a0a0a" />
      </Box>
      
      {/* Screen Glow */}
      <Box args={[2.8, 1.8, 0.05]} position={[0, 0, 0.06]}>
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#004444"
          transparent
          opacity={0.8}
        />
      </Box>
      
      {/* Terminal Text */}
      <Text
        position={[0, 0.3, 0.07]}
        fontSize={0.1}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/courier-new.woff"
      >
        MSJ.DEV TERMINAL
      </Text>
      
      <Text
        position={[0, 0, 0.07]}
        fontSize={0.06}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
      >
        CYBERSECURITY ENGINEER
      </Text>
      
      <Text
        position={[0, -0.3, 0.07]}
        fontSize={0.05}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        AI/ML • BLOCKCHAIN • AUTOMATION
      </Text>
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00ffff"
        size={0.02}
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function NetworkNodes() {
  const nodesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (nodesRef.current) {
      nodesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const nodes = useMemo(() => {
    const nodePositions = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 4;
      nodePositions.push([
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 2,
        Math.sin(angle) * radius
      ]);
    }
    return nodePositions;
  }, []);

  return (
    <group ref={nodesRef}>
      {nodes.map((position, index) => (
        <group key={index}>
          <Sphere args={[0.1]} position={position as [number, number, number]}>
            <meshStandardMaterial
              color="#00ffff"
              emissive="#004444"
            />
          </Sphere>
          
          {/* Connection lines */}
          {index < nodes.length - 1 && (
            <line>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([
                    ...position,
                    ...nodes[index + 1]
                  ]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00ffff" opacity={0.3} transparent />
            </line>
          )}
        </group>
      ))}
    </group>
  );
}

interface CyberpunkScene3DProps {
  className?: string;
}

export default function CyberpunkScene3D({ className = '' }: CyberpunkScene3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        {/* 3D Elements */}
        <FloatingTerminal />
        <ParticleField />
        <NetworkNodes />
        
        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          maxDistance={15}
          minDistance={5}
        />
      </Canvas>
    </div>
  );
}
