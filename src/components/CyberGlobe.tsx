'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

// Project locations (latitude, longitude)
const PROJECT_LOCATIONS = [
  { name: 'Paytm India', lat: 28.6139, lon: 77.2090, color: '#00f5ff' }, // New Delhi
  { name: 'DigiCats Ethereum', lat: 40.7128, lon: -74.0060, color: '#8b5cf6' }, // New York
  { name: 'People.ai Research', lat: 37.7749, lon: -122.4194, color: '#00ff88' }, // San Francisco
  { name: 'Security Research', lat: 51.5074, lon: -0.1278, color: '#ff0088' }, // London
  { name: 'Blockchain Dev', lat: 35.6762, lon: 139.6503, color: '#ffaa00' }, // Tokyo
  { name: 'TryHackMe Labs', lat: 53.4808, lon: -2.2426, color: '#00ffff' }, // Manchester
];

// Attack simulation sources
const THREAT_SOURCES = [
  { lat: 39.9042, lon: 116.4074 }, // Beijing
  { lat: 55.7558, lon: 37.6173 }, // Moscow
  { lat: -23.5505, lon: -46.6333 }, // São Paulo
  { lat: 1.3521, lon: 103.8198 }, // Singapore
];

// Convert lat/lon to 3D coordinates on sphere
function latLonToVector3(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return new THREE.Vector3(x, y, z);
}

// Animated globe mesh
function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]}>
      <meshStandardMaterial
        color="#0a1628"
        wireframe
        transparent
        opacity={0.3}
      />
    </Sphere>
  );
}

// Glowing marker for locations
function LocationMarker({ position, color }: { position: THREE.Vector3; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 0.08;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color={color} />
      {/* Glow effect */}
      <pointLight color={color} intensity={2} distance={0.5} />
    </mesh>
  );
}

// Animated arc between two points
function Arc({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const points = [];
    const numPoints = 50;
    
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const point = new THREE.Vector3();
      point.lerpVectors(start, end, t);
      
      // Add arc height
      const height = Math.sin(t * Math.PI) * 0.5;
      point.normalize().multiplyScalar(2 + height);
      
      points.push(point);
    }
    
    return points;
  }, [start, end]);

  const lineRef = useRef<any>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      const material = lineRef.current.material as THREE.LineBasicMaterial;
      material.opacity = (Math.sin(state.clock.elapsedTime * 2) + 1) * 0.3 + 0.2;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={2}
      transparent
      opacity={0.5}
    />
  );
}

// Threat pulse animation
function ThreatPulse({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = (Math.sin(state.clock.elapsedTime * 3) + 1) * 0.3 + 0.5;
      meshRef.current.scale.setScalar(scale);
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 1 - (scale - 0.5) / 0.6;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="#ff0044" transparent opacity={0.5} />
    </mesh>
  );
}

// Main scene component
function GlobeScene() {
  // Convert project locations to 3D positions
  const projectPositions = PROJECT_LOCATIONS.map(loc =>
    latLonToVector3(loc.lat, loc.lon, 2)
  );

  // Convert threat sources to 3D positions
  const threatPositions = THREAT_SOURCES.map(loc =>
    latLonToVector3(loc.lat, loc.lon, 2)
  );

  // Center point (your location - India)
  const centerPosition = latLonToVector3(28.6139, 77.2090, 2);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      
      {/* Rotating globe */}
      <Globe />
      
      {/* Project markers */}
      {PROJECT_LOCATIONS.map((loc, i) => (
        <LocationMarker
          key={loc.name}
          position={projectPositions[i]}
          color={loc.color}
        />
      ))}
      
      {/* Arcs from center to projects */}
      {projectPositions.map((pos, i) => (
        <Arc
          key={`arc-${i}`}
          start={centerPosition}
          end={pos}
          color={PROJECT_LOCATIONS[i].color}
        />
      ))}
      
      {/* Threat source pulses */}
      {threatPositions.map((pos, i) => (
        <ThreatPulse key={`threat-${i}`} position={pos} />
      ))}
      
      {/* Threat arcs (red danger lines) */}
      {threatPositions.slice(0, 2).map((pos, i) => (
        <Arc
          key={`threat-arc-${i}`}
          start={pos}
          end={centerPosition}
          color="#ff0044"
        />
      ))}
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function CyberGlobe() {
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 5, 15]} />
        <GlobeScene />
      </Canvas>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 text-xs font-mono">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <span className="text-cyan-300">Projects & Deployments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-red-300">Threat Sources</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <span className="text-slate-400">Network Traffic</span>
          </div>
        </div>
      </div>
      
      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 text-xs font-mono space-y-1">
        <div className="text-cyan-400 font-semibold mb-2">GLOBAL REACH</div>
        <div className="text-slate-300">Active Projects: <span className="text-green-400">{PROJECT_LOCATIONS.length}</span></div>
        <div className="text-slate-300">Threat Monitors: <span className="text-red-400">{THREAT_SOURCES.length}</span></div>
        <div className="text-slate-300">Network Nodes: <span className="text-blue-400">{PROJECT_LOCATIONS.length + THREAT_SOURCES.length}</span></div>
      </div>
    </div>
  );
}
