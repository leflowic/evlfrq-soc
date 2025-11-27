import React, { useEffect, useRef } from 'react';

interface WaveformProps {
  isPlaying: boolean;
  color?: string;
  height?: number;
}

export const Waveform: React.FC<WaveformProps> = ({ 
  isPlaying, 
  color = '#3B82F6', 
  height = 40 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const barsRef = useRef<number[]>([]);

  // Initialize random bars
  useEffect(() => {
    if (barsRef.current.length === 0) {
      barsRef.current = Array.from({ length: 60 }, () => Math.random());
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = 3; // Thinner, more precise bars
      const gap = 2;
      const totalWidth = canvas.width;
      const barCount = Math.floor(totalWidth / (barWidth + gap));
      
      ctx.fillStyle = color;

      for (let i = 0; i < barCount; i++) {
        // Retrieve base height from ref or generate new if needed
        let h = barsRef.current[i % barsRef.current.length];

        // Animate if playing
        if (isPlaying) {
          // Add some noise to make it dance
          const noise = Math.sin(Date.now() * 0.015 + i) * 0.5 + 0.5; // Faster jitter
          h = (h + noise) / 2;
        }

        const barHeight = h * height;
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2; // Center vertically

        // Sharper edges for digital feel
        ctx.fillRect(x, y, barWidth, barHeight); 
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, color, height]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={height} 
      className="w-full opacity-100" // Full opacity
    />
  );
};