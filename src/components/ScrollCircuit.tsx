import React, { useEffect, useRef } from "react";

/**
 * Schematic‑style scroll‑reactive circuit animation.
 * This is rebuilt from the **original working node version** but swaps the dots for real EE symbols.
 * Components are kept extremely lightweight so any mistake shows up quickly during debugging.
 */

type ComponentType =
  | "resistor"
  | "capacitor"
  | "inductor"
  | "battery"
  | "transistor"
  | "opamp";

interface Comp {
  x: number;
  y: number;
  type: ComponentType;
  links: Comp[];
}

export const ScrollCircuit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const compsRef = useRef<Comp[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    // ───────────────────────────── Set canvas dims
    const fit = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      build();
    };

    // ───────────────────────────── Build component graph
    const build = () => {
      const L = window.innerWidth * 0.12;
      const R = window.innerWidth * 0.88;
      const spacing = 200;
      const h = document.body.scrollHeight;
      const types: ComponentType[] = [
        "resistor",
        "capacitor",
        "inductor",
        "resistor",
        "battery",
        "resistor",
        "transistor",
        "resistor",
        "opamp",
      ];

      const makeCol = (x: number) => {
        const col: Comp[] = [];
        for (let y = 120, i = 0; y < h - 120; y += spacing, i++) {
          col.push({ x, y, type: types[i % types.length], links: [] });
        }
        return col;
      };

      const left = makeCol(L);
      const right = makeCol(R);

      // vertical links
      for (let i = 0; i < left.length - 1; i++) {
        link(left[i], left[i + 1]);
        link(right[i], right[i + 1]);
      }
      // bridges every two steps
      for (let i = 0; i < Math.min(left.length, right.length); i += 2) {
        link(left[i], right[i]);
      }

      compsRef.current = [...left, ...right];
    };

    const link = (a: Comp, b: Comp) => {
      a.links.push(b);
      b.links.push(a);
    };

    // ───────────────────────────── Draw helpers
    const drawSymbol = (c: Comp, ctx: CanvasRenderingContext2D) => {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.strokeStyle = "#888";
      ctx.lineWidth = 2;

      switch (c.type) {
        case "resistor": {
          ctx.beginPath();
          ctx.moveTo(-12, 0);
          ctx.lineTo(-8, -6);
          ctx.lineTo(-4, 6);
          ctx.lineTo(0, -6);
          ctx.lineTo(4, 6);
          ctx.lineTo(8, -6);
          ctx.lineTo(12, 0);
          ctx.stroke();
          break;
        }
        case "capacitor": {
          ctx.beginPath();
          ctx.moveTo(-12, 0);
          ctx.lineTo(-2, 0);
          ctx.moveTo(-2, -10);
          ctx.lineTo(-2, 10);
          ctx.moveTo(2, -10);
          ctx.lineTo(2, 10);
          ctx.moveTo(2, 0);
          ctx.lineTo(12, 0);
          ctx.stroke();
          break;
        }
        case "inductor": {
          ctx.beginPath();
          for (let i = -2; i <= 2; i++) {
            ctx.arc(i * 6, 0, 6, Math.PI, 0);
          }
          ctx.stroke();
          break;
        }
        case "battery": {
          ctx.beginPath();
          ctx.moveTo(-6, -12);
          ctx.lineTo(-6, 12);
          ctx.moveTo(6, -6);
          ctx.lineTo(6, 6);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(-12, 0);
          ctx.lineTo(-6, 0);
          ctx.moveTo(6, 0);
          ctx.lineTo(12, 0);
          ctx.stroke();
          break;
        }
        case "transistor": {
          // simple NPN-ish symbol
          ctx.beginPath();
          ctx.moveTo(-10, 0);
          ctx.lineTo(0, 0);
          ctx.lineTo(8, -10);
          ctx.moveTo(0, 0);
          ctx.lineTo(8, 10);
          ctx.stroke();
          break;
        }
        case "opamp": {
          ctx.beginPath();
          ctx.moveTo(-14, -14);
          ctx.lineTo(14, 0);
          ctx.lineTo(-14, 14);
          ctx.closePath();
          ctx.stroke();
          ctx.font = "10px sans-serif";
          ctx.fillStyle = "#aaa";
          ctx.fillText("+", -18, -4);
          ctx.fillText("-", -18, 10);
          break;
        }
      }
      ctx.restore();
    };

    const drawLinks = (ctx: CanvasRenderingContext2D) => {
      ctx.strokeStyle = "rgba(140,140,140,0.15)";
      ctx.lineWidth = 1;
      compsRef.current.forEach((c) => {
        c.links.forEach((t) => {
          ctx.beginPath();
          ctx.moveTo(c.x, c.y);
          ctx.lineTo(t.x, t.y);
          ctx.stroke();
        });
      });
    };

    // ───────────────────────────── Animation loop
    const paint = () => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawLinks(ctx);
      compsRef.current.forEach((c) => drawSymbol(c, ctx));
      requestAnimationFrame(paint);
    };

    fit();
    window.addEventListener("resize", fit);
    requestAnimationFrame(paint);

    return () => {
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-30 z-0"
    />
  );
};
