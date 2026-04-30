'use client';

import { useEffect, useRef } from 'react';

interface Hexagon {
  x: number;
  y: number;
  cx: number;
  cy: number;
  opacity: number;
  colorIndex: number;
  icon: string;
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
    const darkColors = ['99, 210, 255', '124, 92, 255', '0, 255, 200'];
    const lightColors = ['0, 112, 243', '109, 40, 217', '16, 185, 129'];
    const icons = ['React', 'CSS', 'HTML', 'C', 'C++', 'JS', 'TS', 'Py', '{}', '</>', 'λ', 'SQL', 'Node'];

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
            colorIndex: Math.floor(Math.random() * 3),
            icon: icons[Math.floor(Math.random() * icons.length)]
          });
        }
      }
    };
    initGrid();
    window.addEventListener('resize', initGrid);

    // Data Signals (Moving lights across the grid)
    interface Signal {
      x: number;
      y: number;
      tx: number;
      ty: number;
      speed: number;
      progress: number;
    }
    const signals: Signal[] = [];
    const maxSignals = window.innerWidth < 768 ? 3 : 6;

    const spawnSignal = () => {
      signals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        tx: Math.random() * width,
        ty: Math.random() * height,
        speed: 0.002 + Math.random() * 0.004, // Slow, elegant movement
        progress: 0
      });
    };

    for(let i = 0; i < maxSignals; i++) spawnSignal();

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
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.classList.contains('light-mode');
      const activeColors = isLight ? lightColors : darkColors;

      // Update moving signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;
        if (s.progress >= 1) {
          signals.splice(i, 1);
          spawnSignal();
        }
      }

      for (let i = 0; i < hexagons.length; i++) {
        const hex = hexagons[i];

        // Calculate if any signal is near this hexagon
        let targetGlow = 0;
        for (const s of signals) {
          const curX = s.x + (s.tx - s.x) * s.progress;
          const curY = s.y + (s.ty - s.y) * s.progress;
          const dist = Math.hypot(hex.cx - curX, hex.cy - curY);
          
          if (dist < hexWidth * 3.5) {
            const glow = 0.2 - (dist / (hexWidth * 3.5)) * 0.18;
            if (glow > targetGlow) targetGlow = glow;
          }
        }

        // Apply glow or fade out
        if (targetGlow > hex.opacity) {
          hex.opacity = targetGlow;
        } else {
          if (hex.opacity > 0.02) {
            hex.opacity -= 0.003; // Smooth fade out trailing effect
          }
        }

        // Draw hexagon fill
        if (hex.opacity > 0) {
          const hexColor = activeColors[hex.colorIndex];
          drawHexagon(hex.cx, hex.cy, r - 1); // r-1 creates a natural gap between hexes
          ctx.fillStyle = `rgba(${hexColor}, ${hex.opacity * 0.3})`; // Very subtle fill
          ctx.fill();
          
          // Only draw borders and icons for ones that are actively hovered
          if (hex.opacity > 0.03) {
            // Soft border
            ctx.lineWidth = 1;
            ctx.strokeStyle = `rgba(${hexColor}, ${hex.opacity * 1.2})`;
            ctx.stroke();

            // Draw icon inside
            ctx.fillStyle = `rgba(${hexColor}, ${hex.opacity * 2.0})`;
            ctx.font = `500 ${r * 0.55}px var(--font-mono)`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(hex.icon, hex.cx, hex.cy);
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', initGrid);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
        // The background color is now handled by the global CSS theme
      }}
      aria-hidden="true"
    />
  );
}
