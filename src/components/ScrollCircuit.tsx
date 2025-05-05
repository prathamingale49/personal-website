import React, { useEffect, useRef } from "react";

interface CircuitComponent {
  x: number;
  y: number;
  type: "resistor" | "capacitor" | "inductor" | "battery" | "transistor" | "opamp";
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
      canvas.height = window.innerHeight;
      createCircuit();
    };

    const createCircuit = () => {
      componentsRef.current = [];
      const totalHeight = document.body.scrollHeight;
      const spacing = 200;

      const leftX = window.innerWidth * 0.1;
      const rightX = window.innerWidth * 0.9;

      const types = ["resistor", "capacitor", "inductor", "battery", "resistor", "resistor", "transistor", "resistor", "opamp"];

      const createColumn = (x: number) => {
        const column: CircuitComponent[] = [];
        for (let i = 100, j = 0; i < totalHeight - 100; i += spacing, j++) {
          const type = types[j % types.length] as CircuitComponent["type"];
          column.push({ x, y: i, type, connections: [] });
        }
        return column;
      };

      const leftColumn = createColumn(leftX);
      const rightColumn = createColumn(rightX);

      // Connect vertical
      for (let i = 0; i < leftColumn.length - 1; i++) {
        leftColumn[i].connections.push(leftColumn[i + 1]);
        rightColumn[i].connections.push(rightColumn[i + 1]);
      }

      // Connect horizontal
      for (let i = 0; i < Math.min(leftColumn.length, rightColumn.length); i += 2) {
        leftColumn[i].connections.push(rightColumn[i]);
        rightColumn[i].connections.push(leftColumn[i]);
      }

      componentsRef.current = [...leftColumn, ...rightColumn];
    };

    const drawComponent = (ctx: CanvasRenderingContext2D, c: CircuitComponent) => {
      ctx.strokeStyle = "#777";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#aaa";

      switch (c.type) {
        case "resistor": {
          ctx.beginPath();
          ctx.moveTo(c.x - 10, c.y);
          for (let i = 0; i < 4; i++) {
            ctx.lineTo(c.x - 6 + i * 4, c.y - 6 * (i % 2 === 0 ? 1 : -1));
          }
          ctx.lineTo(c.x + 10, c.y);
          ctx.stroke();
          break;
        }
        case "capacitor": {
          ctx.beginPath();
          ctx.moveTo(c.x - 10, c.y);
          ctx.lineTo(c.x - 2, c.y);
          ctx.moveTo(c.x + 2, c.y);
          ctx.lineTo(c.x + 10, c.y);
          ctx.moveTo(c.x - 2, c.y - 8);
          ctx.lineTo(c.x - 2, c.y + 8);
          ctx.moveTo(c.x + 2, c.y - 8);
          ctx.lineTo(c.x + 2, c.y + 8);
          ctx.stroke();
          break;
        }
        case "inductor": {
          ctx.beginPath();
          for (let i = -2; i <= 2; i++) {
            ctx.arc(c.x + i * 5, c.y, 5, Math.PI, 0);
          }
          ctx.stroke();
          break;
        }
        case "battery": {
          ctx.beginPath();
          ctx.moveTo(c.x - 6, c.y - 10);
          ctx.lineTo(c.x - 6, c.y + 10);
          ctx.moveTo(c.x + 6, c.y - 6);
          ctx.lineTo(c.x + 6, c.y + 6);
          ctx.stroke();
          break;
        }
        case "transistor": {
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(c.x + 10, c.y - 10);
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(c.x + 10, c.y + 10);
          ctx.moveTo(c.x - 10, c.y);
          ctx.lineTo(c.x, c.y);
          ctx.stroke();
          break;
        }
        case "opamp": {
          ctx.beginPath();
          ctx.moveTo(c.x - 10, c.y - 10);
          ctx.lineTo(c.x + 10, c.y);
          ctx.lineTo(c.x - 10, c.y + 10);
          ctx.closePath();
          ctx.stroke();
          ctx.fillText("+", c.x - 15, c.y - 4);
          ctx.fillText("-", c.x - 15, c.y + 10);
          break;
        }
      }
    };

    const drawConnections = (ctx: CanvasRenderingContext2D, components: CircuitComponent[]) => {
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      components.forEach(c => {
        c.connections.forEach(conn => {
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(conn.x, conn.y);
          ctx.stroke();
        });
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawConnections(ctx, componentsRef.current);
      componentsRef.current.forEach(c => drawComponent(ctx, c));
      requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", () => {}); // placeholder for scroll-reactive animations
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full fixed top-0 left-0 pointer-events-none opacity-30 z-0" />;
};
