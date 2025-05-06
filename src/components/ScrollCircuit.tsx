
import React, { useEffect, useRef } from "react";

interface CircuitNode {
  x: number;
  y: number;
  radius: number;
  type: "resistor" | "capacitor" | "inductor" | "battery" | "transistor" | "opamp";
  connections: {
    node: CircuitNode;
    currentPosition: number;
    active: boolean;
    direction: number;
  }[];
  color: string;
  pulseRadius: number;
  maxPulseRadius: number;
  pulseActive: boolean;
  pulseSpeed: number;
}

export const ScrollCircuit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<CircuitNode[]>([]);
  const animationRef = useRef<number>(0);
  const scrollPercentRef = useRef<number>(0);
  const lastScrollPositionRef = useRef<number>(0);
  const isScrollingDownRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight; // same as original – ensures first screen visible
      createCircuitNodes();
    };

    const componentCycle: CircuitNode["type"][] = [
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

    const createCircuitNodes = () => {
      nodesRef.current = [];
      const leftX = window.innerWidth * 0.1;
      const rightX = window.innerWidth * 0.9;
      const totalHeight = document.body.scrollHeight;
      const nodeDistance = 200;

      const makePath = (x: number) => {
        const path: CircuitNode[] = [];
        for (let y = 100, i = 0; y < totalHeight - 100; y += nodeDistance, i++) {
          path.push(createNode(x, y, componentCycle[i % componentCycle.length]));
        }
        return path;
      };

      const leftPathNodes = makePath(leftX);
      const rightPathNodes = makePath(rightX);

      const horizontalConnections = Math.min(leftPathNodes.length, rightPathNodes.length);
      for (let i = 0; i < horizontalConnections; i += 2) {
        connectNodes(leftPathNodes[i], rightPathNodes[i]);
      }

      for (let i = 0; i < leftPathNodes.length - 1; i++) connectNodes(leftPathNodes[i], leftPathNodes[i + 1]);
      for (let i = 0; i < rightPathNodes.length - 1; i++) connectNodes(rightPathNodes[i], rightPathNodes[i + 1]);

      for (let i = 0; i < Math.min(leftPathNodes.length, rightPathNodes.length) - 1; i += 3) {
        if (leftPathNodes[i] && rightPathNodes[i + 1]) connectNodes(leftPathNodes[i], rightPathNodes[i + 1]);
        if (rightPathNodes[i] && leftPathNodes[i + 1]) connectNodes(rightPathNodes[i], leftPathNodes[i + 1]);
      }

      for (let i = 1; i < Math.min(leftPathNodes.length, rightPathNodes.length) - 1; i += 2) {
        const midX = (leftPathNodes[i].x + rightPathNodes[i].x) / 2;
        const midY = (leftPathNodes[i].y + rightPathNodes[i].y) / 2;
        const componentNode = createNode(midX, midY, "opamp");
        componentNode.radius = 6;
        componentNode.color = "#5c5c5c";
        connectNodes(leftPathNodes[i], componentNode);
        connectNodes(componentNode, rightPathNodes[i]);
      }

      nodesRef.current = [...leftPathNodes, ...rightPathNodes];
    };

    const createNode = (x: number, y: number, type: CircuitNode["type"]): CircuitNode => ({
      x,
      y,
      radius: 4,
      type,
      connections: [],
      color: "#444",
      pulseRadius: 0,
      maxPulseRadius: 15,
      pulseActive: false,
      pulseSpeed: 0.6,
    });

    const connectNodes = (a: CircuitNode, b: CircuitNode) => {
      const link = {
        node: b,
        currentPosition: 0,
        active: false,
        direction: 1,
      } as const;
      a.connections.push({ ...link });
      b.connections.push({ ...link, node: a });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      scrollPercentRef.current = scrollTop / scrollHeight;
      const down = scrollTop > lastScrollPositionRef.current;
      lastScrollPositionRef.current = scrollTop;
      isScrollingDownRef.current = down;
      if (down) {
        activateConnectionsByScroll(scrollPercentRef.current);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => (isScrollingDownRef.current = false), 200);
      }
    };

    const activateConnectionsByScroll = (percent: number) => {
      const unique = nodesRef.current.flatMap((n) => n.connections.map((c) => ({ s: n, c })));
      const connectionsToActivate = Math.floor(unique.length * percent) + 5;
      unique.forEach((item, idx) => {
        if (idx < connectionsToActivate) {
          item.c.active = isScrollingDownRef.current;
          item.c.direction = idx % 2 === 0 ? 1 : -1;
        } else item.c.active = false;
      });
    };

    // ───────────────── drawing helpers
    const drawSymbol = (ctx: CanvasRenderingContext2D, n: CircuitNode) => {
      ctx.save();
      ctx.translate(n.x, n.y);
      ctx.strokeStyle = "#a855f7"; // Neon purple stroke
      ctx.lineWidth = 1.5;

      switch (n.type) {
        case "resistor": {
          ctx.beginPath();
          ctx.moveTo(-8, 0);
          ctx.lineTo(-4, -6);
          ctx.lineTo(0, 6);
          ctx.lineTo(4, -6);
          ctx.lineTo(8, 0);
          ctx.stroke();
          break;
        }
        case "capacitor": {
          ctx.beginPath();
          ctx.moveTo(-10, 0);
          ctx.lineTo(-2, 0);
          ctx.moveTo(-2, -6);
          ctx.lineTo(-2, 6);
          ctx.moveTo(2, -6);
          ctx.lineTo(2, 6);
          ctx.moveTo(2, 0);
          ctx.lineTo(10, 0);
          ctx.stroke();
          break;
        }
        case "inductor": {
          ctx.beginPath();
          for (let i = -2; i <= 2; i++) ctx.arc(i * 4, 0, 4, Math.PI, 0);
          ctx.stroke();
          break;
        }
        case "battery": {
          ctx.beginPath();
          ctx.moveTo(-4, -8);
          ctx.lineTo(-4, 8);
          ctx.moveTo(4, -4);
          ctx.lineTo(4, 4);
          ctx.stroke();
          break;
        }
        case "transistor": {
          ctx.beginPath();
          ctx.moveTo(-8, 0);
          ctx.lineTo(0, 0);
          ctx.lineTo(6, -6);
          ctx.moveTo(0, 0);
          ctx.lineTo(6, 6);
          ctx.stroke();
          break;
        }
        case "opamp": {
          ctx.beginPath();
          ctx.moveTo(-10, -10);
          ctx.lineTo(10, 0);
          ctx.lineTo(-10, 10);
          ctx.closePath();
          ctx.stroke();
          ctx.font = "8px sans-serif";
          ctx.fillStyle = "#a855f7"; // Neon purple text
          ctx.fillText("+", -14, -2);
          ctx.fillText("-", -14, 8);
          break;
        }
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodesRef.current.forEach((n) => {
        n.connections.forEach((c) => {
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(c.node.x, c.node.y);
          ctx.strokeStyle = "rgba(90,90,90,0.15)";
          ctx.lineWidth = 1;
          ctx.stroke();

          if (c.active && isScrollingDownRef.current) {
            // Draw moving current
            const dx = c.node.x - n.x;
            const dy = c.node.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const speed = 2;
            c.currentPosition = (c.currentPosition + speed * c.direction) % dist;
            if (c.currentPosition < 0) c.currentPosition = dist;

            const ratio = c.currentPosition / dist;
            const x = n.x + dx * ratio;
            const y = n.y + dy * ratio;

            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = "#a855f7"; // Neon purple for the moving current
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(168, 85, 247, 0.3)"; // Neon purple glow
            ctx.fill();
          }
        });

        // Draw node with component symbol
        drawSymbol(ctx, n);

        if (n.pulseActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(168, 85, 247, ${1 - n.pulseRadius / n.maxPulseRadius})`; // Purple pulse
          ctx.stroke();
          n.pulseRadius += n.pulseSpeed;
          if (n.pulseRadius > n.maxPulseRadius) {
            n.pulseActive = false;
            n.pulseRadius = 0;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize animation
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};
