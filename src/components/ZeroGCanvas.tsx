'use client';

import { useEffect, useRef } from 'react';

// Fake Python and System Logs
const LOG_SNIPPETS = [
  "def calculate_entropy(data):",
  "    return -sum([p * math.log2(p) for p in data])",
  "import sys, os, time",
  "sys.stdout.write('Connecting to node...')",
  "[OK] Connection established on port 8080",
  "class Node:",
  "    def __init__(self, value):",
  "        self.value = value",
  "        self.next = None",
  "while True:",
  "    data = stream.read(1024)",
  "    if not data: break",
  "await asyncio.gather(*tasks)",
  "return sorted(arr, key=lambda x: x['score'])",
  "git commit -m 'Optimization pass on backend'",
  "[WARN] High memory usage detected in worker_03",
  "Allocating 2048 MB to heap...",
  "Running garbage collection...",
  "def binary_search(arr, target):",
  "    low, high = 0, len(arr) - 1",
  "    while low <= high:",
  "        mid = (low + high) // 2",
  "return None",
  "import numpy as np",
  "df = pd.read_csv('dataset.csv')",
];

interface LogBlock {
  x: number;
  y: number;
  lines: string[];
  currentLine: number;
  currentChar: number;
  opacity: number;
  fading: boolean;
  color: string;
  delay: number;
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
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const blocks: LogBlock[] = [];
    const maxBlocks = width < 768 ? 4 : 8; // Less text on mobile
    const colors = ['124, 92, 255', '99, 210, 255', '0, 255, 200'];

    const createBlock = (): LogBlock => {
      const numLines = Math.floor(Math.random() * 4) + 2;
      const lines = [];
      for(let i=0; i<numLines; i++) {
        lines.push(LOG_SNIPPETS[Math.floor(Math.random() * LOG_SNIPPETS.length)]);
      }
      return {
        x: Math.random() * (width - 200) + 20,
        y: Math.random() * (height - 200) + 50,
        lines,
        currentLine: 0,
        currentChar: 0,
        opacity: 0,
        fading: false,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 50
      };
    };

    for(let i=0; i<maxBlocks; i++) {
      blocks.push(createBlock());
    }

    let animationId: number;
    let frame = 0;

    const animate = () => {
      frame++;
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      ctx.font = '13px var(--font-mono)';
      ctx.textAlign = 'left';

      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];

        if (b.delay > 0) {
          b.delay--;
          continue;
        }

        // Fade in
        if (!b.fading && b.opacity < 0.6) {
          b.opacity += 0.02;
        }

        // Typing logic (type one character every few frames)
        if (!b.fading && frame % 2 === 0) {
          if (b.currentLine < b.lines.length) {
            if (b.currentChar < b.lines[b.currentLine].length) {
              b.currentChar++;
            } else {
              b.currentLine++;
              b.currentChar = 0;
            }
          } else {
            // Finished typing, wait a bit then fade out
            b.delay = 100;
            b.fading = true;
          }
        }

        // Fade out logic
        if (b.fading && b.delay <= 0) {
          b.opacity -= 0.01;
          if (b.opacity <= 0) {
            blocks[i] = createBlock(); // Respawn
            continue;
          }
        }

        // Draw the text
        for (let l = 0; l <= b.currentLine; l++) {
          if (l >= b.lines.length) break;
          const text = l === b.currentLine ? b.lines[l].substring(0, b.currentChar) : b.lines[l];
          
          ctx.fillStyle = `rgba(${b.color}, ${b.opacity})`;
          ctx.fillText(text, b.x, b.y + (l * 20));
          
          // Draw cursor block
          if (l === b.currentLine && !b.fading) {
            const textWidth = ctx.measureText(text).width;
            ctx.fillStyle = `rgba(${b.color}, ${b.opacity > 0.3 ? 0.8 : b.opacity})`;
            if (frame % 20 < 10) { // Blink cursor
              ctx.fillRect(b.x + textWidth + 2, b.y + (l * 20) - 10, 8, 14);
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', setSize);
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
