'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PARTICLE_COUNT = 200;
const MAX_DISTANCE = 3.5;
const MOUSE_RADIUS = 4.0;
const MOUSE_REPEL_FORCE = 0.08;

export default function ZeroGCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouse3DRef = useRef(new THREE.Vector3(9999, 9999, 0));
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const CURRENT_PARTICLE_COUNT = isMobile ? 60 : 150; // Massively reduce CPU load on phones
    
    /* ── Scene & Camera ───────────────────────────────── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x02040a, 0.035);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 15;

    /* ── Renderer ─────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile, // disable antialias on mobile for performance
      alpha: true,
      powerPreference: 'high-performance',
    });
    // Force max DPR of 1 on mobile to prevent GPU lag
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Particles & Lines (Neural Plexus Effect) ──────── */
    const particlesData: { velocity: THREE.Vector3 }[] = [];
    const positions = new Float32Array(CURRENT_PARTICLE_COUNT * 3);
    const colors = new Float32Array(CURRENT_PARTICLE_COUNT * 3);

    const color1 = new THREE.Color(0x63d2ff); // Glow Blue
    const color2 = new THREE.Color(0x7c5cff); // Accent Purple
    const color3 = new THREE.Color(0x00ffc8); // Pulse Green

    for (let i = 0; i < CURRENT_PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ),
      });

      // Assign random color gradient mix
      const randColor = Math.random();
      let c = color1;
      if (randColor > 0.66) c = color2;
      else if (randColor > 0.33) c = color3;
      
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const pGeometry = new THREE.BufferGeometry();
    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(pGeometry, pMaterial);
    scene.add(particleSystem);

    // Lines linking the particles together
    const linesGeometry = new THREE.BufferGeometry();
    const maxLines = CURRENT_PARTICLE_COUNT * CURRENT_PARTICLE_COUNT;
    const linesPositions = new Float32Array(maxLines * 3);
    const linesColors = new Float32Array(maxLines * 3);

    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3).setUsage(THREE.DynamicDrawUsage));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(linesColors, 3).setUsage(THREE.DynamicDrawUsage));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    /* ── Mouse & Resize ───────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse3DRef.current.set(x * 15 * (window.innerWidth / window.innerHeight), y * 15, 0);
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    /* ── Animation Loop ───────────────────────────────── */
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      const posArr = pGeometry.attributes.position.array as Float32Array;
      const colArr = pGeometry.attributes.color.array as Float32Array;
      const mouse3D = mouse3DRef.current;

      for (let i = 0; i < CURRENT_PARTICLE_COUNT; i++) {
        const particleData = particlesData[i];
        
        // Move particles
        posArr[i * 3] += particleData.velocity.x;
        posArr[i * 3 + 1] += particleData.velocity.y;
        posArr[i * 3 + 2] += particleData.velocity.z;

        // Bounce off invisible boundaries
        if (posArr[i * 3] < -18 || posArr[i * 3] > 18) particleData.velocity.x *= -1;
        if (posArr[i * 3 + 1] < -18 || posArr[i * 3 + 1] > 18) particleData.velocity.y *= -1;
        if (posArr[i * 3 + 2] < -10 || posArr[i * 3 + 2] > 10) particleData.velocity.z *= -1;

        // Mouse repulsion (particles scatter when hovered)
        const dxMouse = mouse3D.x - posArr[i * 3];
        const dyMouse = mouse3D.y - posArr[i * 3 + 1];
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distMouse < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - distMouse) * MOUSE_REPEL_FORCE;
          posArr[i * 3] -= (dxMouse / distMouse) * force;
          posArr[i * 3 + 1] -= (dyMouse / distMouse) * force;
        }

        // Draw connecting lines if particles are close enough
        for (let j = i + 1; j < CURRENT_PARTICLE_COUNT; j++) {
          const dx = posArr[i * 3] - posArr[j * 3];
          const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
          const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < MAX_DISTANCE) {
            const alpha = 1.0 - dist / MAX_DISTANCE;

            // Line vertices
            linesPositions[vertexpos++] = posArr[i * 3];
            linesPositions[vertexpos++] = posArr[i * 3 + 1];
            linesPositions[vertexpos++] = posArr[i * 3 + 2];

            linesPositions[vertexpos++] = posArr[j * 3];
            linesPositions[vertexpos++] = posArr[j * 3 + 1];
            linesPositions[vertexpos++] = posArr[j * 3 + 2];

            // Line colors (gradient between the two nodes)
            linesColors[colorpos++] = colArr[i * 3] * alpha;
            linesColors[colorpos++] = colArr[i * 3 + 1] * alpha;
            linesColors[colorpos++] = colArr[i * 3 + 2] * alpha;

            linesColors[colorpos++] = colArr[j * 3] * alpha;
            linesColors[colorpos++] = colArr[j * 3 + 1] * alpha;
            linesColors[colorpos++] = colArr[j * 3 + 2] * alpha;

            numConnected++;
          }
        }
      }

      pGeometry.attributes.position.needsUpdate = true;
      
      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;

      // Slow cinematic rotation
      scene.rotation.y += 0.0008;
      scene.rotation.x += 0.0004;

      renderer.render(scene, camera);
    };

    frameRef.current = requestAnimationFrame(animate);

    /* ── Cleanup ──────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      pGeometry.dispose();
      pMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
