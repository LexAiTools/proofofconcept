import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  ease?: number;
  color?: string;
  refresh?: boolean;
}

export const Particles: React.FC<ParticlesProps> = ({
  className,
  quantity = 100,
  ease = 50,
  color = "#ffffff",
  refresh = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      translateX: number;
      translateY: number;
      size: number;
      alpha: number;
      targetAlpha: number;
      dx: number;
      dy: number;
      magnetism: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles.length = 0;
      for (let i = 0; i < quantity; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          translateX: 0,
          translateY: 0,
          size: Math.random() * 2 + 0.5,
          alpha: 0,
          targetAlpha: Math.random() * 0.6 + 0.1,
          dx: (Math.random() - 0.5) * 0.2,
          dy: (Math.random() - 0.5) * 0.2,
          magnetism: 0.1 + Math.random() * 4,
        });
      }
    };

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        // Wrap particles around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Fade in/out
        if (particle.alpha < particle.targetAlpha) {
          particle.alpha += 0.02;
        } else if (particle.alpha > particle.targetAlpha + 0.1) {
          particle.alpha -= 0.02;
        }

        // Draw particle
        context.globalAlpha = particle.alpha;
        context.fillStyle = color;
        context.beginPath();
        context.arc(
          particle.x + particle.translateX,
          particle.y + particle.translateY,
          particle.size,
          0,
          Math.PI * 2
        );
        context.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    resizeCanvas();
    createParticles();
    render();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [quantity, ease, color, refresh]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none", className)}
    />
  );
};