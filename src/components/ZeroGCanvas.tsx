'use client';

import { useEffect, useRef } from 'react';

interface Hexagon {
  x: number;
  y: number;
  cx: number;
  cy: number;
  opacity: number;
  color: string;
}

export default function ZeroGCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const r = window.innerWidth < 768 ? 20 : 35; // Hexagon radius
    const hexWidth = Math.sqrt(3) * r;
    const hexHeight = 2 * r;
    const colors = ['99, 210, 255', '124, 92, 255', '0, 255, 200'];

    let hexagons: Hexagon[] = [];

    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      hexagons = [];
      const cols = Math.ceil(width / hexWidth) + 1;
      const rows = Math.ceil(height / (1.5 * r)) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const isOdd = row % 2 !== 0;
          const cx = col * hexWidth + (isOdd ? hexWidth / 2 : 0);
          const cy = row * 1.5 * r;
          
          hexagons.push({
            x: col,
            y: row,
            cx,
            cy,
            opacity: 0.02, // Base extremely dim opacity
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
    };
    initGrid();
    window.addEventListener('resize', initGrid);

    // Mouse interaction
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawHexagon = (cx: number, cy: number, radius: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + (Math.PI / 6); // Pointy topped
        const hx = cx + radius * Math.cos(angle);
        const hy = cy + radius * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
    };

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i];

        // Check distance to mouse
        const dist = Math.hypot(hex.cx - mouse.x, hex.cy - mouse.y);
        
        // If mouse is near, light up the hexagon instantly
        if (dist < hexWidth * 2.5) {
          hex.opacity = 0.5 - (dist / (hexWidth * 2.5)) * 0.3; // Glow depends on distance
        } else {
          // Slowly fade out back to base opacity
          if (hex.opacity > 0.02) {
            hex.opacity -= 0.005;
          }
        }

        // Randomly pulse some hexagons
        if (Math.random() < 0.0001 && hex.opacity <= 0.03) {
          hex.opacity = 0.3;
        }

        // Draw hexagon fill
        if (hex.opacity > 0) {
          drawHexagon(hex.cx, hex.cy, r - 1); // r-1 creates a natural gap between hexes
          ctx.fillStyle = `rgba(${hex.color}, ${hex.opacity})`;
          ctx.fill();
          
          // Only draw borders for ones that are glowing to keep it clean
          if (hex.opacity > 0.05) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${hex.color}, ${hex.opacity * 1.5})`;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', initGrid);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: '#02040a',
      }}
      aria-hidden="true"
    />
  );
}
