"use client";

import React, { useEffect, useRef } from "react";

interface BeanParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  vRot: number;
  opacity: number;
  color: string;
}

export function CoffeeBeansCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Coffee bean palette colors for particles
    const beanColors = [
      "rgba(196, 85, 37, 0.22)",  // Terracotta / first crack
      "rgba(44, 26, 17, 0.16)",   // Espresso roast
      "rgba(140, 79, 43, 0.20)",  // Caramel
      "rgba(91, 108, 80, 0.18)",  // Raw green
      "rgba(217, 168, 101, 0.24)", // Chaff / gold
    ];

    // Create 18 floating coffee beans
    const particleCount = Math.min(20, Math.floor(width / 70));
    const particles: BeanParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.4, // gently drifting upward
        radius: 7 + Math.random() * 8, // bean size (radius)
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.008,
        opacity: 0.3 + Math.random() * 0.5,
        color: beanColors[Math.floor(Math.random() * beanColors.length)],
      });
    }

    // Mouse coordinates for gentle interaction
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Draw a single coffee bean on canvas
    const drawBean = (
      p: BeanParticle
    ) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const r = p.radius;
      ctx.fillStyle = p.color;

      // Bean Body: organic oval
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.85, r * 1.25, 0, 0, Math.PI * 2);
      ctx.fill();

      // Curved central furrow / crack line
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.9);
      ctx.bezierCurveTo(-r * 0.35, -r * 0.3, r * 0.35, r * 0.3, 0, r * 0.9);
      ctx.strokeStyle = "rgba(249, 246, 240, 0.45)";
      ctx.lineWidth = Math.max(1, r * 0.15);
      ctx.lineCap = "round";
      ctx.stroke();

      ctx.restore();
    };

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        // Mouse avoidance (soft repulsive force)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 1.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Wrap around boundaries
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        drawBean(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-40 dark:opacity-50 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
