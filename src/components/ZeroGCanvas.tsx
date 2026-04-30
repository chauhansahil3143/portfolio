'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ── The Digital Ocean Component ──
function CyberOcean({ isMobile }: { isMobile: boolean }) {
  const ref1 = useRef<THREE.Points>(null!);
  const ref2 = useRef<THREE.Points>(null!);
  
  const count = isMobile ? 1200 : 4000;

  // Generate random X/Z grid positions once
  const [pos1, pos2] = useMemo(() => {
    const p1 = new Float32Array(count * 3);
    const p2 = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 50;
      
      p1[i * 3] = x;
      p1[i * 3 + 1] = 0;
      p1[i * 3 + 2] = z;

      p2[i * 3] = x;
      p2[i * 3 + 1] = 0;
      p2[i * 3 + 2] = z;
    }
    return [p1, p2];
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Smooth mouse parallax
    const mouseX = (state.mouse.x * window.innerWidth) / 100;
    const mouseY = (state.mouse.y * window.innerHeight) / 100;
    
    state.camera.position.x += (mouseX * 0.5 - state.camera.position.x) * 0.05;
    state.camera.position.y += ((6 - mouseY * 0.5) - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);

    // Animate Layer 1 (Cyan Waves)
    const arr1 = ref1.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = arr1[i * 3];
      const z = arr1[i * 3 + 2];
      // Wave math
      arr1[i * 3 + 1] = Math.sin(x / 3 + t * 0.5) * Math.cos(z / 3 + t * 0.4) * 1.5;
    }
    ref1.current.geometry.attributes.position.needsUpdate = true;
    ref1.current.rotation.y = t * 0.02;

    // Animate Layer 2 (Purple Waves - inverted and floating higher)
    const arr2 = ref2.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const x = arr2[i * 3];
      const z = arr2[i * 3 + 2];
      arr2[i * 3 + 1] = Math.sin(x / 4 - t * 0.6) * Math.cos(z / 4 - t * 0.5) * 2.0 + 1.0;
    }
    ref2.current.geometry.attributes.position.needsUpdate = true;
    ref2.current.rotation.y = -t * 0.015;
  });

  return (
    <group>
      {/* Cyan Layer */}
      <Points ref={ref1} positions={pos1} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#00ffc8" size={isMobile ? 0.08 : 0.05} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.6} />
      </Points>
      
      {/* Purple Layer */}
      <Points ref={ref2} positions={pos2} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#7c5cff" size={isMobile ? 0.08 : 0.06} sizeAttenuation={true} depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.8} />
      </Points>
    </group>
  );
}

export default function ZeroGCanvas() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        // Dark cosmic gradient background
        background: 'radial-gradient(circle at center, #0a0f1d 0%, #02040a 100%)',
      }}
      aria-hidden="true"
    >
      <Canvas 
        camera={{ position: [0, 6, 15], fov: 60 }}
        dpr={isMobile ? 1 : [1, 1.5]}
        gl={{ powerPreference: 'high-performance', antialias: false }}
      >
        {/* Soft fog to fade out the edges into the background color */}
        <fog attach="fog" args={['#02040a', 10, 35]} />
        <CyberOcean isMobile={isMobile} />
      </Canvas>
    </div>
  );
}
