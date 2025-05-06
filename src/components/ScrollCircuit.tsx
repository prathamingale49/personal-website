
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
      canvas.height = window.innerHeight;
      createCircuitNodes();
    };

    const componentCycle: CircuitNode["type"][] = [
      "resistor",
      "capacitor",
      "inductor",
      "opamp", // Added more op-amps in the cycle
      "resistor",
      "battery",
      "opamp", // Added more op-amps in the cycle
      "resistor",
      "transistor",
      "opamp", // Added more op-amps in the cycle
    ];

    const createCircuitNodes = () => {
      nodesRef.current = [];
      const totalHeight = document.body.scrollHeight;
      const nodeDistance = 180; // Decreased for more nodes
      
      // Create a more complex network with nodes across the entire width
      const createNodesInArea = (minX: number, maxX: number, minY: number, maxY: number, density: number) => {
        const nodes: CircuitNode[] = [];
        const count = Math.floor(density * (maxX - minX) * (maxY - minY) / 10000);
        
        for (let i = 0; i < count; i++) {
          const x = minX + Math.random() * (maxX - minX);
          const y = minY + Math.random() * (maxY - minY);
          const type = componentCycle[Math.floor(Math.random() * componentCycle.length)];
          nodes.push(createNode(x, y, type));
        }
        return nodes;
      };
      
      // Create main vertical paths (left, center, and right)
      const leftPathNodes = createVerticalPath(window.innerWidth * 0.1, nodeDistance, componentCycle);
      const centerPathNodes = createVerticalPath(window.innerWidth * 0.5, nodeDistance, componentCycle);
      const rightPathNodes = createVerticalPath(window.innerWidth * 0.9, nodeDistance, componentCycle);
      
      // Create random nodes in between to create a messy network
      const randomNodes = createNodesInArea(
        window.innerWidth * 0.05, 
        window.innerWidth * 0.95, 
        100, 
        totalHeight - 100, 
        0.5 // Density factor
      );

      // Connect vertical paths
      connectVerticalPath(leftPathNodes);
      connectVerticalPath(centerPathNodes);
      connectVerticalPath(rightPathNodes);
      
      // Connect horizontal and diagonal paths between main paths
      connectPathsHorizontally(leftPathNodes, centerPathNodes);
      connectPathsHorizontally(centerPathNodes, rightPathNodes);
      connectPathsDiagonally(leftPathNodes, rightPathNodes);
      
      // Connect random nodes to create a messy network
      connectRandomNodes(randomNodes, [...leftPathNodes, ...centerPathNodes, ...rightPathNodes]);
      
      // Create some opamp integrations
      createOpampCircuits(leftPathNodes, centerPathNodes, rightPathNodes);

      nodesRef.current = [...leftPathNodes, ...centerPathNodes, ...rightPathNodes, ...randomNodes];
    };

    const createNode = (x: number, y: number, type: CircuitNode["type"]): CircuitNode => ({
      x,
      y,
      radius: 4,
      type,
      connections: [],
      color: "#a855f7", // Neon purple for better visibility
      pulseRadius: 0,
      maxPulseRadius: 18, // Increased for better visibility
      pulseActive: false,
      pulseSpeed: 0.6,
    });

    const connectNodes = (a: CircuitNode, b: CircuitNode) => {
      if (!a || !b) return; // Safeguard
      const link = {
        node: b,
        currentPosition: 0,
        active: false,
        direction: 1,
      } as const;
      a.connections.push({ ...link });
      b.connections.push({ ...link, node: a });
    };

    const createVerticalPath = (x: number, nodeDistance: number, componentTypes: CircuitNode["type"][]) => {
      const path: CircuitNode[] = [];
      const totalHeight = document.body.scrollHeight;
      for (let y = 100, i = 0; y < totalHeight - 100; y += nodeDistance, i++) {
        // Add some randomness to x position for less rectangular feel
        const randomX = x + (Math.random() - 0.5) * 40;
        path.push(createNode(randomX, y, componentTypes[i % componentTypes.length]));
      }
      return path;
    };

    const connectVerticalPath = (path: CircuitNode[]) => {
      for (let i = 0; i < path.length - 1; i++) {
        connectNodes(path[i], path[i + 1]);
      }
    };

    const connectPathsHorizontally = (path1: CircuitNode[], path2: CircuitNode[]) => {
      const connections = Math.min(path1.length, path2.length);
      for (let i = 0; i < connections; i += 2) {
        connectNodes(path1[i], path2[i]);
      }
    };

    const connectPathsDiagonally = (path1: CircuitNode[], path2: CircuitNode[]) => {
      const connections = Math.min(path1.length, path2.length) - 1;
      for (let i = 0; i < connections; i += 3) {
        connectNodes(path1[i], path2[i + 1]);
        connectNodes(path1[i + 1], path2[i]);
      }
    };

    const connectRandomNodes = (randomNodes: CircuitNode[], structuredNodes: CircuitNode[]) => {
      // Connect each random node to 2-4 other nodes
      randomNodes.forEach(node => {
        const connectionsCount = 2 + Math.floor(Math.random() * 3);
        const availableNodes = [...randomNodes, ...structuredNodes].filter(n => n !== node);
        
        // Find closest nodes to connect to
        const sortedByDistance = availableNodes.sort((a, b) => {
          const distA = Math.sqrt((a.x - node.x) ** 2 + (a.y - node.y) ** 2);
          const distB = Math.sqrt((b.x - node.x) ** 2 + (b.y - node.y) ** 2);
          return distA - distB;
        });
        
        // Connect to closest nodes
        for (let i = 0; i < Math.min(connectionsCount, sortedByDistance.length); i++) {
          if (Math.random() < 0.7) { // 70% chance to connect for organic feel
            connectNodes(node, sortedByDistance[i]);
          }
        }
      });
    };
    
    const createOpampCircuits = (leftPath: CircuitNode[], centerPath: CircuitNode[], rightPath: CircuitNode[]) => {
      // Create some special opamp circuit formations
      const paths = [leftPath, centerPath, rightPath];
      
      // Add opamp circuits at various places
      for (let i = 2; i < Math.min(leftPath.length, rightPath.length, centerPath.length); i += 3) {
        const sourcePath = paths[i % 3];
        const targetPath = paths[(i + 1) % 3];
        
        if (sourcePath[i] && targetPath[i - 1]) {
          // Create an opamp node
          const midX = (sourcePath[i].x + targetPath[i - 1].x) / 2;
          const midY = (sourcePath[i].y + targetPath[i - 1].y) / 2;
          const opamp = createNode(midX, midY, "opamp");
          opamp.radius = 6; // Slightly larger for visibility
          
          // Connect in a feedback configuration (common in circuit design)
          connectNodes(sourcePath[i], opamp);
          connectNodes(opamp, targetPath[i - 1]);
          
          if (targetPath[i]) {
            connectNodes(targetPath[i - 1], targetPath[i]); // Feedback path
          }
          
          nodesRef.current.push(opamp);
        }
      }
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - window.innerHeight;
      scrollPercentRef.current = scrollTop / scrollHeight;
      const down = scrollTop > lastScrollPositionRef.current;
      lastScrollPositionRef.current = scrollTop;
      isScrollingDownRef.current = down;
      
      // Activate connections based on exact scroll position rather than just direction
      activateConnectionsByScrollPosition(scrollPercentRef.current);
      
      // If scrolling, show obvious animation by pulsing nodes
      triggerNodePulses();
      
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => (isScrollingDownRef.current = false), 200);
    };

    const activateConnectionsByScrollPosition = (percent: number) => {
      const unique = nodesRef.current.flatMap((n) => n.connections.map((c) => ({ s: n, c })));
      
      // Determine how many connections to activate based on scroll percentage
      const connectionsToActivate = Math.floor(unique.length * percent);
      
      // Update connection state based on exact scroll position
      unique.forEach((item, idx) => {
        // Use scroll position to determine if connection should be active
        const shouldBeActive = idx < connectionsToActivate;
        
        item.c.active = shouldBeActive;
        
        // Reverse direction when scrolling up
        if (shouldBeActive) {
          item.c.direction = isScrollingDownRef.current ? 1 : -1;
        }
      });
    };
    
    const triggerNodePulses = () => {
      // Make scroll animation more obvious by triggering pulses on random nodes
      if (isScrollingDownRef.current || !isScrollingDownRef.current) { // Animation for both directions
        const visibleNodes = nodesRef.current.filter(node => 
          node.y > window.scrollY && node.y < window.scrollY + window.innerHeight);
            
        // Pulse more nodes when scrolling for dramatic effect
        const nodesToPulse = Math.floor(visibleNodes.length * 0.2); // Pulse 20% of visible nodes
        
        for (let i = 0; i < nodesToPulse; i++) {
          const randomIndex = Math.floor(Math.random() * visibleNodes.length);
          if (visibleNodes[randomIndex]) {
            visibleNodes[randomIndex].pulseActive = true;
            visibleNodes[randomIndex].pulseRadius = 0;
          }
        }
      }
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
          // Draw basic connection line
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(c.node.x, c.node.y);
          ctx.strokeStyle = "rgba(168, 85, 247, 0.25)"; // More visible lines with purple tint
          ctx.lineWidth = 1;
          ctx.stroke();

          if (c.active) {
            // Draw moving current with increased visibility
            const dx = c.node.x - n.x;
            const dy = c.node.y - n.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const speed = 3; // Increased speed for more obvious animation
            c.currentPosition = (c.currentPosition + speed * c.direction) % dist;
            if (c.currentPosition < 0) c.currentPosition = dist;

            const ratio = c.currentPosition / dist;
            const x = n.x + dx * ratio;
            const y = n.y + dy * ratio;

            // Larger current dot
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = "#a855f7"; // Neon purple
            ctx.fill();

            // Stronger glow effect
            ctx.beginPath();
            ctx.arc(x, y, 6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(168, 85, 247, 0.5)"; // Brighter purple glow
            ctx.fill();
          }
        });

        // Draw node with component symbol
        drawSymbol(ctx, n);

        if (n.pulseActive) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(168, 85, 247, ${1 - n.pulseRadius / n.maxPulseRadius})`; // Purple pulse
          ctx.lineWidth = 2; // Thicker line for visibility
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
