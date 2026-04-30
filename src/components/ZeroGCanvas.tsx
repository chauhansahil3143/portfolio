'use client';

import { useEffect, useRef } from 'react';

export default function ZeroGCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // The characters to display in the data streams (Code, Binary, Web Dev symbols)
    const characters = '01{}<>;=[]+-*/'.split('');
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    
    // Array to track the Y position of each column
    let drops: number[] = [];
    
    const initDrops = () => {
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        // Randomize initial vertical positions so they don't all start at the exact top
        drops[i] = Math.random() * -100;
      }
    };
    initDrops();

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initDrops(); // Re-initialize streams on resize
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Mouse interaction: push characters away from mouse
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      // Create the fading trail effect by drawing a semi-transparent black rectangle
      ctx.fillStyle = 'rgba(2, 4, 10, 0.1)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px var(--font-mono)`;
      ctx.textAlign = 'center';

      for (let i = 0; i < drops.length; i++) {
        // Don't draw if the drop hasn't entered the screen yet
        if (drops[i] * fontSize < 0) {
          drops[i]++;
          continue;
        }

        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize + fontSize / 2;
        let y = drops[i] * fontSize;

        // Interaction: If a drop is near the mouse, subtly deflect it
        const dist = Math.hypot(x - mouse.x, y - mouse.y);
        let drawX = x;
        if (dist < 100) {
          const push = (100 - dist) / 10;
          drawX += (x > mouse.x ? push : -push);
        }

        // Color logic: Alternate between Cyan and Purple streams
        const isPurpleStream = i % 3 === 0;
        
        // The "head" of the stream is bright white/glow, the tail is colored
        if (Math.random() > 0.95) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = isPurpleStream ? '#7c5cff' : '#63d2ff';
        } else {
          ctx.fillStyle = isPurpleStream ? 'rgba(124, 92, 255, 0.8)' : 'rgba(99, 210, 255, 0.8)';
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, drawX, y);

        // Reset the drop to the top randomly to create staggered endless streams
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move the drop down
        drops[i]++;
      }

      // Throttle the frame rate slightly so the code doesn't fall *too* fast
      setTimeout(() => {
        animationId = requestAnimationFrame(animate);
      }, 35);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setSize);
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
