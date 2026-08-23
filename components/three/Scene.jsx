'use client';
/* eslint-disable react-hooks/purity */

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';
import { useEffect, useState, useRef, useMemo, Suspense } from 'react';

function DataCore({ isDark, isMobile }) {
  const coreRef = useRef();
  
  const particleCount = 4000;
  
  const particles = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const radius = 6.2;
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;
      
      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!coreRef.current) return;
    const time = state.clock.getElapsedTime();
    
    coreRef.current.rotation.y = time * 0.15;
    coreRef.current.rotation.z = time * 0.05;
    
    // Pulse animation: grows up to 10% larger and shrinks back to normal size
    const pulseScale = 1 + (Math.sin(time * 3) + 1) * 0.05;
    coreRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    
    const targetX = (state.pointer.y * Math.PI) / 6;
    const targetY = (state.pointer.x * Math.PI) / 6;
    
    coreRef.current.parent.rotation.x = THREE.MathUtils.lerp(coreRef.current.parent.rotation.x, targetX, 0.05);
    coreRef.current.parent.rotation.y = THREE.MathUtils.lerp(coreRef.current.parent.rotation.y, targetY, 0.05);
  });

  const coreColor = isDark ? '#10b981' : '#059669'; 

  return (
    <group position={[0, isMobile ? 0 : -2, -15]}>
      {/* PERFECT Particle Core */}
      <points ref={coreRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial 
          size={isDark ? 0.09 : 0.15} 
          color={coreColor} 
          transparent 
          opacity={isDark ? 0.4 : 0.55} 
          sizeAttenuation 
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending} 
        />
      </points>
    </group>
  );
}

function ShootingStars({ isDark }) {
  const trails = useMemo(() => {
    // Adjust count for a less overwhelming effect
    return Array.from({ length: 6 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 60, // Wider spread
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 15
      ],
      speed: Math.random() * 1.5 + 0.5,
      offset: Math.random() * Math.PI * 2 // Add phase offset so they don't move together
    }));
  }, []);

  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      // Use offset so they move asynchronously in different directions
      child.position.x = trails[i].position[0] + Math.sin(time * trails[i].speed + trails[i].offset) * 35;
      child.position.y = trails[i].position[1] + Math.cos(time * trails[i].speed * 0.8 + trails[i].offset) * 25;
    });
  });

  return (
    <group ref={groupRef}>
      {trails.map((t, i) => (
        <Trail key={i} width={1.2} color={isDark ? '#10b981' : '#059669'} length={12} decay={1} attenuation={(t) => t * t}>
          <mesh position={t.position}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color={isDark ? '#ffffff' : '#09090b'} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

function AmbientDust({ isDark }) {
  const particleCount = isDark ? 6000 : 3000;
  
  // Store both position and individual speeds
  const { positions, speeds } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 120; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 120; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100 - 10; // z
      
      // Random upward speed for each particle
      spd[i] = Math.random() * 0.05 + 0.02; 
    }
    return { positions: pos, speeds: spd };
  }, [particleCount]);

  const dustRef = useRef();

  useFrame(() => {
    if (!dustRef.current) return;
    
    // Slight ambient rotation
    dustRef.current.rotation.y += 0.0005;
    
    // Move particles upwards like a water stream
    const positions = dustRef.current.geometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += speeds[i]; // Move up along Y axis
      
      // If a particle floats too high, reset it to the bottom
      if (positions[i * 3 + 1] > 60) {
        positions[i * 3 + 1] = -60;
      }
    }
    dustRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={dustRef} key={isDark ? 'dark' : 'light'}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={isDark ? 0.15 : 0.18} 
        color={isDark ? '#ffffff' : '#0f172a'} 
        transparent 
        opacity={isDark ? 0.9 : 0.3} 
        sizeAttenuation 
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function ResponsiveAdjustments({ isMobile }) {
  const { camera } = useThree();
  
  useEffect(() => {
    // Dynamically update camera position
    let zPos = 15;
    if (isMobile) {
      zPos = 32;
    } else if (window.innerWidth > 1920) {
      zPos = 25; // Push camera further back on 4K+ screens so globe isn't gigantic
    }
    camera.position.set(0, 0, zPos);
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  return null;
}

export default function Scene() {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
        <Suspense fallback={null}>
          <ResponsiveAdjustments isMobile={isMobile} />
          <fog attach="fog" args={[isDark ? '#09090b' : '#ffffff', isMobile ? 25 : 18, isMobile ? 75 : 55]} />
          
          <AmbientDust isDark={isDark} />
          
          <DataCore isDark={isDark} isMobile={isMobile} />
          
          <ShootingStars isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
