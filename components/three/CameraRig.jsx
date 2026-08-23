'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useState } from 'react';

export default function CameraRig() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial calculation
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    // We want the camera to slowly move forward through the structure as user scrolls
    // Z starts at 10, moves to -20
    const targetZ = THREE.MathUtils.lerp(10, -30, scrollProgress);
    
    // Slight panning on X and Y based on scroll to make it dynamic
    const targetX = Math.sin(scrollProgress * Math.PI * 2) * 2;
    const targetY = Math.cos(scrollProgress * Math.PI) * 1;
    
    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    state.camera.lookAt(0, 0, targetZ - 10);
  });

  return null;
}
