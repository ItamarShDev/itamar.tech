'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  decay: number;
  alpha: number;
}

interface Firework {
  x: number;
  y: number;
  targetY: number;
  vx: number;
  vy: number;
  color: string;
  trail: Point[];
  exploded: boolean;
  particles: Particle[];
  hasReachedPeak: boolean;
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const fireworksRef = useRef<Firework[]>([]);
  const fireworkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isDev = process.env.NODE_ENV === 'development';
  const today = new Date();
  const isIndependenceDay = isDev || (today.getMonth() === 6 && today.getDate() === 4);

  // Function to explode a firework
  const explodeFirework = useCallback((firework: Firework, fastExplosion = false) => {
    if (firework.exploded) return;
    
    firework.exploded = true;
    const particleCount = fastExplosion ? 60 : 80; // Slightly more particles for better effect
    const angleIncrement = (Math.PI * 2) / particleCount;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = angleIncrement * i;
      const speed = fastExplosion ? 
        (Math.random() * 10 + 5) : // Faster particles for immediate explosion
        (Math.random() * 6 + 3) * 0.7;   // 30% slower speed
      
      firework.particles.push({
        x: firework.x,
        y: firework.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        color: firework.color,
        decay: fastExplosion ? 
          (Math.random() * 0.08 + 0.05) : // Faster decay for quick cleanup
          (Math.random() * 0.014 + 0.007),  // 30% slower decay
        alpha: 1
      });
    }
  }, []);

  // Function to explode all fireworks
  const explodeAllFireworks = useCallback((force = false) => {
    const currentFireworks = [...fireworksRef.current];
    for (const firework of currentFireworks) {
      if (!firework.exploded || force) {
        if (force) {
          // Force immediate explosion at current position
          firework.exploded = true;
          const particleCount = 100;
          const angleIncrement = (Math.PI * 2) / particleCount;
          
          for (let i = 0; i < particleCount; i++) {
            const angle = angleIncrement * i;
            const speed = Math.random() * 5 + 2;
            
            firework.particles.push({
              x: firework.x,
              y: firework.y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 3 + 1,
              color: firework.color,
              decay: Math.random() * 0.015 + 0.01,
              alpha: 1
            });
          }
        } else {
          explodeFirework(firework);
        }
      }
    }
  }, [explodeFirework]);

  // Function to launch a new firework
  const launchFirework = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const x = Math.random() * canvas.width;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const targetY = Math.random() * (canvas.height * 0.4) + (canvas.height * 0.1); // Random height in top 50%
    
    fireworksRef.current.push({
      x,
      y: canvas.height,
      targetY, // Store the target Y position for explosion
      vx: (Math.random() * 2 - 1) * 0.65, // Slower horizontal movement (reduced by ~20%)
      // Calculate initial velocity to reach exactly the target height (20% slower)
      vy: -Math.min(Math.random() * 1.6 + 4.8, Math.sqrt(2 * 0.08 * (canvas.height - targetY))), // 20% slower upward velocity
      color,
      trail: [],
      particles: [],
      exploded: false,
      hasReachedPeak: false
    });
  }, []);

  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear the canvas with transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw all fireworks
    for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
      const firework = fireworksRef.current[i];
      
      // Skip if firework has exploded and has no particles left
      if (firework.exploded && firework.particles.length === 0) {
        fireworksRef.current.splice(i, 1);
        continue;
      }
      
      // Update firework position if not exploded and not yet reached peak
      if (!firework.exploded && !firework.hasReachedPeak) {
        // Update position with air resistance to prevent overshooting
        firework.x += firework.vx;
        firework.y += firework.vy;
        
        // Apply gravity with easing as firework approaches peak (20% slower)
        const distanceToPeak = firework.y - firework.targetY;
        const gravity = Math.min(0.08, 0.04 + (distanceToPeak / 1250)); // 20% reduced gravity for slower movement
        firework.vy += gravity;
        
        // Check if firework should explode (reached peak or target)
        if (firework.vy >= 0) {
          firework.hasReachedPeak = true;
          explodeFirework(firework);
          continue; // Skip to particle drawing
        }
        
        // Add to trail
        firework.trail.push({ x: firework.x, y: firework.y });
        if (firework.trail.length > 10) {
          firework.trail.shift();
        }
        
        // Draw trail
        for (let j = 0; j < firework.trail.length; j++) {
          const alpha = j / firework.trail.length;
          ctx.beginPath();
          ctx.arc(firework.trail[j].x, firework.trail[j].y, 2 * alpha, 0, Math.PI * 2);
          ctx.fillStyle = firework.color.replace(')', `, ${alpha})`).replace('hsl', 'hsla');
          ctx.fill();
        }
        
        // Draw firework head
        ctx.beginPath();
        ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = firework.color;
        ctx.fill();
      }
      
      // Update and draw particles if firework has exploded
      if (firework.exploded) {
        for (let j = firework.particles.length - 1; j >= 0; j--) {
          const part = firework.particles[j];
          part.x += part.vx;
          part.y += part.vy;
          part.vy += 0.08; // Reduced gravity for 30% slower falling
          part.alpha -= part.decay * 0.84; // 30% slower fade out (1.2 * 0.7)
          part.size *= 0.974; // 30% slower size reduction

          // Draw particle if visible enough
          if (part.alpha > 0.05) {
            ctx.beginPath();
            ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
            ctx.fillStyle = part.color.replace(')', `, ${part.alpha})`).replace('hsl', 'hsla');
            ctx.fill();
          }

          // Remove if nearly invisible or very small
          if (part.alpha < 0.05 || part.size < 0.3) {
            firework.particles.splice(j, 1);
          }
        }
      }
    }
    
    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [explodeFirework]);

  // Initialize canvas and start animation
  useEffect(() => {
    if (!isIndependenceDay || !canvasRef.current) return undefined;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full viewport
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);

    // Start launching fireworks - adjusted for 20% slower animation
    fireworkIntervalRef.current = setInterval(() => {
      if (Math.random() < 0.16) { // Slightly reduced chance to compensate for slower animation
        launchFirework();
      }
    }, 500) as unknown as NodeJS.Timeout;

  // Cleanup function
  const cleanup = () => {
    // Stop any new fireworks from launching immediately
    if (fireworkIntervalRef.current) {
      clearInterval(fireworkIntervalRef.current);
      fireworkIntervalRef.current = null;
    }
    
    // Force explode all active fireworks immediately with fast explosion
    const currentFireworks = [...fireworksRef.current];
    for (const firework of currentFireworks) {
      if (!firework.exploded) {
        // Use fast explosion for immediate cleanup
        explodeFirework(firework, true);
      }
    }
    
    // Schedule a quick cleanup after a short delay
    const cleanupDelay = 300; // Only show explosions for 300ms
    const cleanupTimer = setTimeout(() => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      window.removeEventListener('resize', resizeCanvas);
    }, cleanupDelay);
    
    // Return cleanup function
    return () => {
      clearTimeout(cleanupTimer);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  };
  }, [isIndependenceDay, launchFirework, animate, explodeFirework]);

if (!isIndependenceDay) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1000,
      }}
    />
  );
}
