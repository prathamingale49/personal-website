import React, { useEffect, useRef } from "react";

type ComponentType = "resistor" | "capacitor" | "inductor" | "battery" | "transistor" | "opamp";

interface CircuitComponent {
  x: number;
  y: number;
  type: ComponentType;
  connections: CircuitComponent[];
}

export const ScrollCircuit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const componentsRef = useRef<CircuitComponent[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      generateComponents();
    };

    const generateComponents = () => {
      const leftX = window.innerWidth * 0.1;
      const rightX = window.innerWidth * 0.9;
      const height = document.body.scrollHeight;
      const spacing = 200;
      const types: ComponentType[] = ["resistor", "capacitor", "inductor", "battery", "transistor", "opamp"];
      const getType = () => types[Math.floor(Math.random() * types.length * 0.5)];

      const leftComponents: CircuitComponent[] = [];
      const rightComponents: CircuitComponent[] = [];

      for (let y = 100; y < height - 100; y += spacing) {
        leftComponents.push({ x: leftX, y, type: getType(), connections: [] });
        rightComponents.push({ x: rightX, y, type: getType(), connections: [] });
      }

      for (let i = 0; i < leftComponents.length - 1; i++) {
        connect(leftComponents[i], leftComponents[i + 1]);
        connect(rightComponents[i], rightComponents[i + 1]);
      }

      for (let i = 0; i < leftComponents.length; i += 2) {
        connect(leftComponents[i], rightComponents[i]);
      }

      componentsRef.current = [...leftComponents, ...rightComponents];
    };

    const connect = (a: CircuitComponent, b: CircuitComponent) => {
      a.connections.push(b);
      b.connections.push(a);
    };

    const drawComponent = (ctx: CanvasRenderingContext2D, c: CircuitComponent) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.strokeStyle = "#999";
      ctx.lineWidth = 2;

      switch (c.type) {
        case "resistor":
          ctx.beginPath();
          for (let i = -20; i <= 20; i += 10) {
            ctx.lineTo(i, (i % 20 === 0 ? -10 : 10));
          }
          ctx.stroke();
          break;
        case "capacitor":
          ctx.beginPath();
          ctx.moveTo(-10, -15);
          ctx.lineTo(-10, 15);
          ctx.moveTo(10, -15);
          ctx.lineTo(10, 15);
          ctx.stroke();
          break;
        case "inductor":
          ctx.beginPath();
          for (let i = -20; i <= 20; i += 10) {
            ctx.arc(i, 0, 5, 0, Math.PI);
          }
          ctx.stroke();
          break;
        case "battery":
          ctx.beginPath();
          ctx.moveTo(-6, -15);
          ctx.lineTo(-6, 15);
          ctx.moveTo(6, -10);
          ctx.lineTo(6, 10);
          ctx.stroke();
          break;
        case "transistor":
          ctx.beginPath();
          ctx.moveTo(-10, 0);
          ctx.lineTo(0, 0);
          ctx.lineTo(10, -10);
          ctx.moveTo(0, 0);
          ctx.lineTo(10, 10);
          ctx.stroke();
          break;
        case "opamp":
          ctx.beginPath();
          ctx.moveTo(-20, -20);
          ctx.lineTo(20, 0);
          ctx.lineTo(-20, 20);
          ctx.closePath();
          ctx.stroke();
          ctx.fillText("+", -18, -5);
          ctx.fillText("-", -18, 10);
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      componentsRef.current.forEach((c) => {
        drawComponent(ctx, c);
        c.connections.forEach((target) => {
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = "rgba(120,120,120,0.1)";
          ctx.stroke();
        });
      });
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full opacity-30 z-0" />;
};
