'use client';

import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Html } from '@react-three/drei';

export default function BlueprintNode({ position, label, description, link, scale = 1, color = '#3b82f6', isProject = false }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
      const time = performance.now() / 1000;
      meshRef.current.position.y += Math.sin(time * 2 + position[0]) * 0.002;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          scale={active ? scale * 1.5 : (hovered ? scale * 1.2 : scale)}
          onClick={(e) => { e.stopPropagation(); setActive(!active); }}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'crosshair'; }}
          onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'auto'; }}
        >
          {isProject ? <boxGeometry args={[1, 1, 1]} /> : <icosahedronGeometry args={[1, 0]} />}
          <meshPhysicalMaterial 
            color={active ? '#ffffff' : color} 
            emissive={active ? '#ffffff' : color}
            emissiveIntensity={active ? 1.2 : (hovered ? 0.8 : 0.2)}
            roughness={0.1}
            metalness={0.9}
            transmission={hovered ? 0.5 : 0.9}
            thickness={0.5}
            transparent={true}
            opacity={0.8}
            wireframe={true}
          />
        </mesh>
        
        {/* Core Node Inside Wireframe */}
        <mesh scale={active ? scale * 0.6 : (hovered ? scale * 0.4 : scale * 0.2)}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={active ? color : (hovered ? '#ffffff' : color)} />
        </mesh>
        
        {/* Constant Text Label */}
        <Text
          position={[0, -scale * 1.5, 0]}
          fontSize={0.3}
          color={active ? '#ffffff' : (hovered ? '#ffffff' : '#0ea5e9')}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>

        {/* Interactive HUD when active */}
        {active && (
          <Html position={[scale, scale, 0]} center zIndexRange={[100, 0]}>
            <div className="glass-panel" style={{ width: '250px', padding: '1.5rem', pointerEvents: 'auto', background: 'rgba(10, 15, 25, 0.85)' }}>
              <h3 className="mono-text" style={{ color: 'var(--accent-color)', marginBottom: '0.5rem', fontSize: '1.2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>{label}</h3>
              <p style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                {description}
              </p>
              {link && (
                <a href={link} target="_blank" rel="noopener noreferrer" className="mono-text" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--accent-color)', color: '#000', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>
                  [ ACCESS LINK ]
                </a>
              )}
            </div>
          </Html>
        )}
      </group>
    </Float>
  );
}
