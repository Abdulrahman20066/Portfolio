'use client';

import { useEffect, useRef } from 'react';

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Floating particles
    const particles = Array.from({ length: 80 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      size:    Math.random() * 2 + 0.5,
      speedX:  (Math.random() - 0.5) * 0.4,
      speedY:  (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.1,
      color:   Math.random() > 0.5 ? '0, 212, 255' : Math.random() > 0.5 ? '255, 51, 102' : '0, 255, 148',
    }));

    // Floating shapes
    const shapes = Array.from({ length: 12 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * canvas.height,
      size:    Math.random() * 40 + 15,
      speedX:  (Math.random() - 0.5) * 0.3,
      speedY:  (Math.random() - 0.5) * 0.3,
      rotation:Math.random() * Math.PI * 2,
      rotSpeed:(Math.random() - 0.5) * 0.01,
      opacity: Math.random() * 0.15 + 0.05,
      type:    Math.floor(Math.random() * 3), // 0=square, 1=triangle, 2=circle
      color:   Math.random() > 0.5 ? '0, 212, 255' : Math.random() > 0.5 ? '255, 51, 102' : '0, 255, 148',
    }));

    let animId: number;

    function drawShape(s: typeof shapes[0]) {
      ctx!.save();
      ctx!.translate(s.x, s.y);
      ctx!.rotate(s.rotation);
      ctx!.strokeStyle = `rgba(${s.color}, ${s.opacity})`;
      ctx!.lineWidth = 1;
      ctx!.beginPath();

      if (s.type === 0) {
        // Square
        ctx!.strokeRect(-s.size / 2, -s.size / 2, s.size, s.size);
      } else if (s.type === 1) {
        // Triangle
        ctx!.moveTo(0, -s.size / 2);
        ctx!.lineTo(s.size / 2, s.size / 2);
        ctx!.lineTo(-s.size / 2, s.size / 2);
        ctx!.closePath();
        ctx!.stroke();
      } else {
        // Circle
        ctx!.arc(0, 0, s.size / 2, 0, Math.PI * 2);
        ctx!.stroke();
      }

      ctx!.restore();
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw grid lines
      ctx!.strokeStyle = 'rgba(26, 47, 69, 0.3)';
      ctx!.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < canvas!.width; x += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, canvas!.height);
        ctx!.stroke();
      }
      for (let y = 0; y < canvas!.height; y += gridSize) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(canvas!.width, y);
        ctx!.stroke();
      }

      // Draw & update particles
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx!.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;
      }

      // Draw & update shapes
      for (const s of shapes) {
        drawShape(s);
        s.x        += s.speedX;
        s.y        += s.speedY;
        s.rotation += s.rotSpeed;

        if (s.x < -50) s.x = canvas!.width + 50;
        if (s.x > canvas!.width + 50) s.x = -50;
        if (s.y < -50) s.y = canvas!.height + 50;
        if (s.y > canvas!.height + 50) s.y = -50;
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        opacity:       0.8,
      }}
    />
  );
}